import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private esEnviadoSource = new BehaviorSubject<boolean>(false);
  esEnviado$ = this.esEnviadoSource.asObservable();

  cambiarEstadoEnviado(esEnviado: boolean) {
    this.esEnviadoSource.next(esEnviado);
  }

  constructor() { }
}
