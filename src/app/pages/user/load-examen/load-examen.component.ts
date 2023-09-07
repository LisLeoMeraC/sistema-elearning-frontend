import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrls: ['./load-examen.component.css']
})
export class LoadExamenComponent implements OnInit {

  catId:any;
  examenes:any;

  constructor(
    private route:ActivatedRoute,
    private examenService:ExamenService
  ) { }

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.catId = params['catId'];

          console.log("Cargando todos las evaluaciones");
          this.examenService.obtenerExamenesActivos().subscribe(
            (data) => {
              console.log("Respuesta completa: ",data);
              this.examenes = data;
              //console.log(this.examenes);
            },
            (error) => {
              console.log(error);
            }
          )
        }
        
      )
  }

}
