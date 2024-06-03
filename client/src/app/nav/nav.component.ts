import { Component, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Division } from '../_models/division';
import { catchError, take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsModalComponent } from '../modals/notifications-modal/notifications-modal.component';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('toggleBox', [
    state('open', style({
      transform: 'translateX(400px)'
    })),
    state('closed', style({
      transform: 'translateX(0px)'
    })),
    transition('open => closed', [
      animate('.6s')
    ]),
    transition('closed => open', [
      animate('.6s')
    ]),
  ])
],
})
export class NavComponent implements OnInit {
  @Input() displayBoolean: boolean;
  model: any = {}
  collapsed = true;
  private isOpen: boolean = false;
  registerMode = false;
  loginMode = false;
  divisions: Division[];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 0;
  pageSize = 5;
  loading = false;
  display: boolean = true;
  isMobile: boolean;
  public innerWidth: any;
  unreadMessages: number = 0;
  user: User;
  notifications: Notification[];
  messages: Message[];
  url: string;
  isBanned: boolean;
  filterargs = {title: 'hello'};
  loginToggle: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(public accountService: AccountService, public router: Router, 
    private messageService: MessageService, private deviceService: DeviceDetectorService, 
    private modalServ: NgbModal, private toastr: ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
     };

  ngOnInit(): void {
    if ("user" in localStorage) {
      //this.getUnreadMessages(this.user?.username);
      //this.getUnreadNotifications(this.user?.username);
    }
    if (this.displayBoolean) {
      this.displayNavbar();
    }
    this.isMobile = this.deviceService.isMobile();
    this.innerWidth = window.innerWidth;
  }


  displayNavbar() {
    this.display = !this.display;
  }

  closeNavbar() {
    this.display = !this.display;
  }

  login() {
    this.displayNavbar();
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/');
      setTimeout(() => {
        this.getUnreadMessages(this.user.username);
        this.getUnreadNotifications(this.user.username);
      }, 1000)
    })
    this.registerMode = false;
  }
  
  refresh() {
    this.getUnreadNotifications(this.user?.username);
    this.getUnreadMessages(this.user?.username);
  }

  logout() {
    this.displayNavbar();
    this.unreadMessages = 0;
    this.accountService.logout();
    this.router.navigateByUrl('/');
    if (this.router.url === '/') {
      this.reloadCurrentPage();
    }
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
    if (this.registerMode) {
      this.goToTop();
      this.closeNavbar();
    }
  }

  goToTop(){
    window.scrollTo(0,0);
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
    this.loginMode = true;
  }

  openNotificationsModal(username: string) {
    const modalRef = this.modalServ.open(NotificationsModalComponent);
    modalRef.componentInstance.username = username;
    modalRef.componentInstance.modalRef = modalRef;
    modalRef.componentInstance.nav = NavComponent;
  }

  getUnreadNotifications(username: string) {
    this.accountService.getUnreadNotifications(username).subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  getUnreadMessages(username: string) {
    this.messageService.getUnreadMessages(username).subscribe(messages => {
      this.messages = messages;
    });
  }

  convertText(title: string) {
    var result = title?.toLowerCase().replace(' ', '-');
    return result;
  }

  replaceTitle(title: string) {
    return title.replace(" ", "-");
  }

  loginToggler() {
    this.loginToggle = !this.loginToggle;
  }

  reloadCurrentPage() {
    window.setTimeout(function(){location.reload()},100);
   }

}
