import { Component, Input } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';
import { take } from 'rxjs/operators';
import { ToDoListService } from '../../_services/to-do-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() comment: any;
  user: User;
  group: any;
  member: boolean;

  constructor(public accountService: AccountService, private toDoListServ: ToDoListService, private router: Router) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
     };

     ngOnInit(): void {
      this.getUserComments(this.comment.taskId);
      if (this.router.url.includes('/uzytkownicy/')) {  
        this.member = true; 
      }
    }

    getUserComments(taskId: number) {
    this.toDoListServ.getGroupByTaskId(taskId).subscribe(group => {
      this.group = group;
    })
  }

  convertText(title: string) {
    var result = title?.toLowerCase().split(' ').join('-').normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/%c5%82/g, "l").replace(/%C5%82/g, "l").
                replace(/ł/g, "l").replace('"', '').replace("/", "");
    result = this.removeSpecialChars(result);
    return result;
  }

  removeSpecialChars(title: string) {
    var specialChars = "/[!@#$%^&*()_+=[]{};':|,.<>?];"
    for (var special of specialChars) {
      title = title?.split(special).join('');
    }
    title = title?.replace("/", "").replace(/=/g, "").replace(String.fromCharCode(92), "").trim();
    return title;
  }

}
