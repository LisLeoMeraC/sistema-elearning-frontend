import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css']
})
export class AddExamenComponent implements OnInit {
  examenForm: FormGroup = new FormGroup({}); // Define un FormGroup

  categorias:any = [];

  maxPreguntas: number = 0; // Establece el número máximo de preguntas permitidas aquí
  preguntasActuales: number = 0; // Inicializa el número de preguntas actuales en 0



  examenData = {
    titulo:'',
    descripcion:'',
    puntosMaximos:'',
    numeroDePreguntas:'',
    activo:true,
    categoria:{
      categoriaId:''
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService:CategoriaService,
    private snack:MatSnackBar,
    private examenService:ExamenService,
    private router:Router) { }

  ngOnInit(): void {

    this.examenForm = this.formBuilder.group({
      puntosMaximos: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      numeroDePreguntas: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

    this.categoriaService.listarCategorias().subscribe(
      (dato:any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },(error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar los datos','error');
      }
    )
  }
  guardarCuestionario(){
    console.log(this.examenData);
    if(this.examenData.titulo.trim() == '' || this.examenData.titulo == null){
      this.snack.open('El título es requerido','',{
        duration:3000
      });
      return ;
    }
    

    this.examenService.agregarExamen(this.examenData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Test guardado','El test ha sido guardado con éxito','success');
        this.examenData = {
          titulo : '',
          descripcion : '',
          puntosMaximos : '',
          numeroDePreguntas : '',
          activo:true,
          categoria:{
            categoriaId:''
          }
        }
        this.router.navigate(['/admin/examenes']);
      },
      (error) => {
        Swal.fire('Error','Error al guardar el test','error');
      }
    )
  }
  

}
