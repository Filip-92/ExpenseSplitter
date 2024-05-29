import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { Photo } from 'src/app/_models/photo';
import { Reply } from 'src/app/_models/reply';
import { MembersService } from 'src/app/_services/members.service';
import { MemeService } from 'src/app/_services/meme.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  members: Partial<Member[]>;
  photos: Photo[];
  liked: boolean;
  predicate = 'liked';
  pageNumber = 0;
  pageSize = 5;
  pagination: Pagination;
  photo: Photo;
  url: string;
  comments: Comment[];
  replies: Reply[];
  numberOfLikes: number;
  mainMemes: number;
  memes: any;

  constructor(private memberService: MembersService, private toastr: ToastrService, 
    public presence: PresenceService, private memeService: MemeService) { }

  ngOnInit(): void {
    //     if (this.member.id !== 11) {
    //   this.getUserPhoto(this.member.username);
    // } else {
      this.url = '././assets/LogoImage.png';
    //}
  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.liked = !this.liked;
      if(this.liked) {
        this.numberOfLikes++;
        this.liked = true;
      } else {
        this.numberOfLikes--;
        this.liked = false;
      }
    })
  }

  deletePhotos() {
    this.member.photos?.forEach(p => {
      if (!p.isMain) {
        this.memberService.deletePhoto(p.id).subscribe(() => {
          this.member.photos = this.member.photos.filter(x => x.id !== p.id);
        })
      }
    })
  }

  changeDateFormat(date) {
    var newDate = date.substring(0,10);
    return newDate;
  }

  getUserPhoto(username: string) {
    this.memberService.getUserPhoto(username).subscribe(photo => {
      this.url = photo?.url;
    })
  }
}