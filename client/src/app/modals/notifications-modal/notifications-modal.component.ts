import { Component, Input, OnInit } from '@angular/core';
import { NavComponent } from 'src/app/nav/nav.component';
import { AccountService } from 'src/app/_services/account.service';
import { MemeService } from 'src/app/_services/meme.service';

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  styleUrls: ['./notifications-modal.component.css']
})
export class NotificationsModalComponent implements OnInit {
  @Input() username: string;
  @Input() modalRef: any;
  scrolltop: number=null;
  loading: boolean = false;
  meme: any;

  constructor(private accountService: AccountService, private memeService: MemeService) { }

  notifications: any;

  ngOnInit(): void {
    this.getNotifications(this.username);
  }

  getNotifications(username: string) {
    this.loading = true;
    this.accountService.getNotifications(username).subscribe(notifications => {
      this.notifications = notifications;
      this.loading = false;
    });
  }

  markAsRead(notificationId: number) {
    this.accountService.markAsRead(notificationId).subscribe(() => {
      this.notifications.splice(this.notifications.findIndex(p => p.id === notificationId), 1);
    });
    this.modalRef.close();
    window.setTimeout(function(){location.reload()},200);
  }

  removeNotification(notificationId: number) {
    this.accountService.removeNotification(notificationId).subscribe(() => {
      this.notifications.splice(this.notifications.findIndex(p => p.id === notificationId), 1);
    })
  }

  removeAllNotifications() {
    this.accountService.getNotifications(this.username).subscribe(notifications => {
      this.notifications = notifications;
      for (let i=0; i<this.notifications.length; i++) {
        this.removeNotification(this.notifications[i].id)
      }
    });
  }
}
