import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {
  esEnviado = false;
  puntosConseguidos: number = 0;
  respuestasCorrectas: number = 0;
  preguntasFallidas: any[] = [];
  intentos: number = 0;

  constructor(private datosService: DatosService) {} // Inyecta el servicio

  ngOnInit(): void {
    this.datosService.esEnviado$.subscribe(esEnviado => {
      this.esEnviado = esEnviado;
    });
  }
}
