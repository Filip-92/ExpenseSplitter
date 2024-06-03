import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-meme-thumbnail',
  templateUrl: './meme-thumbnail.component.html',
  styleUrls: ['./meme-thumbnail.component.css']
})
export class MemeThumbnailComponent implements OnInit {
  @Input() memeId: any;
  meme: any;
  youtubeId: string;
  youtubeThumbnail: string;
  loading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  checkURL(url: string) {
    return(url?.match(/\.(jpeg|jpg|gif|png|webp)$/) != null);
  }

  extractYoutubeVideoId(url: string) {
    this.youtubeId = url.split("/embed/")[1];
    this.youtubeThumbnail = 'https://img.youtube.com/vi/' + this.youtubeId + '/0.jpg';
    return this.youtubeId;
  }

}
