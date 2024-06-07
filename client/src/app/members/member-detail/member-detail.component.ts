import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Reply } from 'src/app/_models/reply';
import { environment } from 'src/environments/environment';
import { AdminService } from 'src/app/_services/admin.service';
import { ToDoListService } from '../../_services/to-do-list.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})

export class MemberDetailComponent implements OnInit, OnDestroy {
  member: Member = {
    memeUrl: '',
    id: 0,
    username: '',
    photoUrl: '',
    age: 0,
    created: undefined,
    lastActive: undefined,
    gender: '',
    photos: [],
    comments: [],
    numberOflikes: 0
  };
  activeTab: TabDirective;
  messages: Message[] = [];
  user: User;
  users: any;
  members: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 0;
  pageSize = 8;
  pagination: Pagination;
  @ViewChild('scrollMe') meme : ElementRef;
  scrolltop: number=null;
  userId: number;
  comments: any;
  url: string;
  loading: boolean = false;

  constructor(public presence: PresenceService, private route: ActivatedRoute, 
    private messageService: MessageService, protected accountService: AccountService,
    private router: Router, private memberService: MembersService, private http: HttpClient, 
    private toastr: ToastrService, public datepipe: DatePipe, private toDoListServ: ToDoListService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    }

  ngOnInit(): void {
    if ("user" in localStorage) {
      this.route.data.subscribe(data => {
        this.member = data.member;
        if (this.member.username === this.user.username) {
          window.location.replace('uzytkownik/edycja');
        }
      })
      this.getMemberDetails();
    } else {
      this.toastr.error('Zaloguj się aby mieć dostęp')
      this.router.navigateByUrl('/')
    }

  }

  getUserPhoto(username: string) {
    this.memberService.getUserPhoto(username).subscribe(photo => {
      this.url = photo?.url;
    })
  }

  getMemberDetails() {
    this.loading = true;
    this.getUsers();
    this.getUserComments(this.member.username);
    // if (this.member.id !== 11) {
    //   this.getUserPhoto(this.member.username);
    // } else {
    //   this.url = '././assets/LogoImage.png';
    // }
    this.loading = false;
  }
  
  loadMessages() {
    this.messageService.getMessageThread(this.member?.username).subscribe(messages => {
      this.messages = messages;
    })
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab?.heading === 'Wiadomości' && this.messages?.length === 0) {
      this.messageService.createHubConnection(this.user, this.member?.username);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  changeDateFormat(date) {
    var newDate = date.substring(0,10);
    return newDate;
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    window.scrollTo(0, 500);
    this.scrolltop = 0;
    this.meme.nativeElement.scrollTo(0, 0);
  }

  getUsers() {
    this.http.get(environment.apiUrl + 'users').subscribe(response => {
      this.users = response;
      for(let user of this.users){
      if (user.username == this.member.username) {
        this.userId = user.id;
      }
    }
    }, error => {
      console.log(error);
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

  getUserComments(username: string) {
    this.toDoListServ.getUserComments(username).subscribe(comments => {
      this.comments = comments;
    })
  }

}