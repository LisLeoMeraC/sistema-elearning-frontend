import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categoria',
  templateUrl: './view-categoria.component.html',
  styleUrls: ['./view-categoria.component.css']
})
export class ViewCategoriaComponent {
  
  categorias:any = [

  ]

  constructor(private categoriaService:CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato:any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar las categorias','error');
      }
    )
  }
}
