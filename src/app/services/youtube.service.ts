import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  obtenerVideos(tema: string) {
    const API_KEY = 'AIzaSyD0WIfCuJSltzwa_kn2oe3kvfZJxRB_-UE'; // Asegúrate de reemplazar 'TU_CLAVE_API' con tu clave real.
    const YOUTUBE_ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';
    return this.http.get(`${YOUTUBE_ENDPOINT}?q=${tema}&key=${API_KEY}&part=snippet&type=video&maxResults=5`);
  }
}