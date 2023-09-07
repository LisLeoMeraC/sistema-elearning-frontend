import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private tituloSource = new BehaviorSubject<string>('');
  tituloActual = this.tituloSource.asObservable();

  constructor() { }

  cambiarTitulo(titulo: string) {
    this.tituloSource.next(titulo);
  }
}