import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  private baseUrl: string = 'https://api.openai.com/v1/chat/completions';  // URL de la API de OpenAI
  
  constructor(private http: HttpClient) { }

  generateQuestion(tema: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer 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',  // RECUERDA: Reemplaza con tu clave API y nunca la expongas en el frontend.
      'Content-Type': 'application/json'  
    });

    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "user", "content": `Piensa como profesor de secundaria: ${tema}`}
      ]
    };

    return this.http.post<any>(this.baseUrl, body, { headers: headers });
  }
}
