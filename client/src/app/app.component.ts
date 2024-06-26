import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';
import { strings as stringsPL } from 'ngx-timeago/language-strings/pl';
import { TimeagoIntl } from 'ngx-timeago';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Expense Splitter';
  users: any;

  constructor(private accountService: AccountService, private presence: PresenceService, private intl: TimeagoIntl) {
      intl.strings = stringsPL;
      intl.changes.next();
    }
  
  ngOnInit() {
    window.scrollTo(0,0);
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }

  }
}