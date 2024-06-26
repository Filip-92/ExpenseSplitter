import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-remove-account',
  templateUrl: './remove-account.component.html'
})
export class RemoveAccountComponent implements OnInit {
  @Input() user: User;
  @Input() modalRef: any;
  users: User[];

  constructor(private accountService: AccountService, private router: Router,
    private toastr: ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
     }

  ngOnInit(): void {
  }

  removeAccount(username) {
    this.accountService.removeAccount(username).subscribe(() => {
      this.users?.splice(this.users?.findIndex(p => p.username === username), 1);
    })
    this.close();
    //this.logout();
    this.toastr.success("Konto zostało usunięte pomyślnie");
  }

  close() {
    this.modalRef.close();
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
