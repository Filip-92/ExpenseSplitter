import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Pagination } from 'src/app/_models/pagination';
import { Router } from '@angular/router';
import { Reply } from 'src/app/_models/reply';
import { HelperService } from 'src/app/_services/helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @ViewChild('changePasswordForm') changePasswordForm: NgForm;
  @ViewChild('scrollMe') meme : ElementRef;
  model: any = {};
  scrolltop:number=null;
  member: Member;
  user: User;
  members: Partial<Member[]>;
  predicate = 'likedBy';
  pageNumber = 0;
  pageSize = 8;
  pagination: Pagination;
  comments: Comment[];
  replies: Reply[];
  numberOfLikes: number = 0;
  mainMemes: number = 0;
  url: string;
  photos: any;
  loading: boolean = false;
  loadingMember: boolean = false;

  constructor(private accountService: AccountService, private memberService: MembersService, 
    private toastr: ToastrService, private router: Router, private helperService: HelperService, private modalServ: NgbModal, private titleService: Title) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  tab2Loaded: boolean = false;


  ngOnInit(): void {
    if ("user" in localStorage) {
      this.loadMember();
      this.getMemberDetails();
    } else {
      this.toastr.warning("Zaloguj się aby mieć dostęp");
      this.router.navigateByUrl('/');
    }
    if ("photoUrl" in localStorage) {
      this.user.photoUrl = localStorage.getItem("photoUrl");
    }
  }

  getMemberDetails() {
    this.loading = true;
    this.titleService.setTitle("Profil użytkownika " + this?.user?.username);
    this.loading = false;
  }

  getTab2() { 
    this.tab2Loaded = true; 
    console.log("hey")
 }

  getUserPhoto(username: string) {
    this.memberService?.getUserPhoto(username)?.subscribe(photo => {
      this.url = photo?.url;
    })
  }

  deletePhotos() {
    this.member?.photos?.forEach(p => {
        this.memberService?.deletePhoto(p.id).subscribe(() => {
          this.member.photos = this?.member?.photos?.filter(x => x.id !== p.id);
        })
    })
  }

  loadMember() {
    this.loadingMember = true;
    this.memberService.getMember(this?.user?.username).subscribe(member => {
      this.member = member;
    })
    this.loadingMember = false;
  }

  updateMember() {
    this.memberService.updateMember(this?.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this?.member);
    })
  }

  loadLikes() {
    this.memberService.getLikes(this?.predicate, this?.pageNumber, this?.pageSize).subscribe(response => {
      this.members = response?.result;
      this.pagination = response?.pagination;
    })
  }

  changeDateFormat(date: string) {
    var newDate = date?.substring(0,10);
    return newDate;
  }


  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(x => x.id !== photoId);
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
  }

  getMemberNumberOfLikes(username: string) {
    this.memberService.getAllUserLikesNumber(username).subscribe(numberOfLikes => {
      this.numberOfLikes = numberOfLikes;
    })
  }

  genderToPolish(gender: string) {
    if (gender === 'male') {
      return 'Mężczyzna';
    } else if (gender === 'female') {
      return 'Kobieta';
    } else {
      return 'Helikopter bojowy';
    }
  }

  log() {
    console.log("Hej")
  }

  checkIfOlderThan1Hour(date: any) {
    return this.helperService.checkIfOlderThan1Hour(date, this.user)
  }
}