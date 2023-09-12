import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseURL from './helper';
// Asegúrate de ajustar la ruta al archivo helper.ts

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  private endpoint: string = `${baseURL}/api/chatgpt/generate-question`;

  constructor(private http: HttpClient) { }

  generateQuestion(tema: string): Observable<any> {
    const body = {
      tema: tema
    };

    return this.http.post<any>(this.endpoint, body);
  }
}

