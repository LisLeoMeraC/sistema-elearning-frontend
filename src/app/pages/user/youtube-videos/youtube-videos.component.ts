import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from '../../../services/youtube.service'; 
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-youtube-videos',
  templateUrl: './youtube-videos.component.html',
  styleUrls: ['./youtube-videos.component.css']
})
export class YoutubeVideosComponent implements OnInit {

  videos: any[] = [];
  videoUrls: SafeResourceUrl[] = [];
  videosData: { title: string, url: SafeResourceUrl }[] = [];
  tema: string;

  constructor(
    private youtubeService: YoutubeService, 
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.tema = data.tema; 
  }

  ngOnInit(): void {
    if (this.tema) {
      this.youtubeService.obtenerVideos(this.tema).subscribe(data => {
        this.videos = (data as any).items;
        this.videosData = this.videos.map(video => ({
          title: video.snippet.title,
          url: this.sanitizeUrl(video.id.videoId)
        }));
      },
      error => {
        console.error('Hubo un error al obtener los videos:', error);
      });
    }
  }

  sanitizeUrl(videoId: string): SafeResourceUrl {
    const videoURL = 'https://www.youtube.com/embed/' + videoId;
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }

  trackById(index: number, video: any): string {
    return video.id.videoId;
  }

}