import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-service.service';

import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { YoutubeVideosComponent } from 'src/app/pages/user/youtube-videos/youtube-videos.component';
import Swal from 'sweetalert2';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {

  examenId: any;
  tituloExamen:any;
  preguntas: any;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos = 0;

  preguntasFallidas: any[] = [];
  videos: any[] = [];

  esEnviado = false;
  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private datosService: DatosService, // Agregar el servicio aquí
    public dialog: MatDialog,
    private sharedService: SharedService,
    private youtubeService: YoutubeService
  ) { }

  ngOnInit(): void {
    this.prevenirElBotonDeRetroceso();
    this.examenId = this.route.snapshot.params['examenId'];
    this.tituloExamen= this.route.snapshot.params['titulo'];
    console.log(this.examenId);
    this.cargarPreguntas();
    this.sharedService.cambiarTitulo(this.tituloExamen);
  }

  ngOnDestroy(): void {
    this.datosService.cambiarEstadoEnviado(false); // Restablecer el estado al salir del componente
  }

  cargarPreguntas() {
    this.preguntaService.listarPreguntasDelExamenParaLaPrueba(this.examenId).subscribe(
      (data: any) => {
        console.log(data);
        this.preguntas = data;
  
        // Si hay preguntas, obtenemos el título del examen
        if (this.preguntas && this.preguntas.length > 0) {
          this.tituloExamen = this.preguntas[0].examen.titulo;
  
          // Aquí puedes hacer la llamada para cargar los videos relacionados, si es necesario.
          
        }
  
        this.timer = this.preguntas.length * 2 * 60;
  
        this.preguntas.forEach((p: any) => {
          p['respuestaDada'] = '';
        });
        console.log(this.preguntas);
        this.iniciarTemporizador();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las preguntas de la prueba', 'error');
      }
    );
  }
  
 

  iniciarTemporizador() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluarExamen();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  prevenirElBotonDeRetroceso() {
    history.pushState(null, null!, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null!, location.href);
    });
  }

  enviarCuestionario() {
    Swal.fire({
      title: '¿Quieres enviar el Test?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        this.evaluarExamen();
        this.datosService.cambiarEstadoEnviado(true); // Cambiar el estado aquí
      }
    });
  }

  evaluarExamen() {
    this.preguntaService.evaluarExamen(this.preguntas).subscribe(
      (data: any) => {
        console.log(data);
        this.puntosConseguidos = data.puntosMaximos;
        this.respuestasCorrectas = data.respuestasCorrectas;
        this.intentos = data.intentos;

        // Asigna directamente las preguntas incorrectas desde la respuesta del servidor
        this.preguntasFallidas = data.preguntasIncorrectas;

        this.esEnviado = true;

        console.log(data.preguntasFallidas);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerHoraFormateada() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} seg`;
  }

  imprimirPagina() {
    window.print();
  }
  abrirVideos() {
    this.dialog.open(YoutubeVideosComponent, {
      width: '700px',
      height: '500px',
      data: { tema: this.tituloExamen } // envía el título del examen como data
    });
  }
}
