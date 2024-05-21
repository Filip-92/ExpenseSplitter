import { Component, Input, OnInit } from '@angular/core';
import { MemeService } from 'src/app/_services/meme.service';

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

  constructor(private memeService: MemeService) { }

  ngOnInit(): void {
    this.getMeme(this.memeId);
  }

  getMeme(memeId: number) {
    this.loading = true;
    this.memeService.getMeme(memeId).subscribe(meme => {
      this.meme = meme;
      if (this.meme?.url.includes("youtube-nocookie")) {
        this.extractYoutubeVideoId(this.meme?.url);
      }
      this.loading = false;
    });
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
