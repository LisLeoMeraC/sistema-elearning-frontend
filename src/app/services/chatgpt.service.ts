import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  // Ajusta la URL para apuntar a tu backend local
  private baseUrl: string = 'https://computev3-a8811c602065.herokuapp.com/api/chatgpt/generate-question';

  constructor(private http: HttpClient) { }

  generateQuestion(tema: string): Observable<any> {
    const body = {
      tema: tema
    };

    return this.http.post<any>(this.baseUrl, body);
  }
}
