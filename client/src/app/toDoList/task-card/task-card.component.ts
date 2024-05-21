import { Component, Input } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ToDoListService } from '../../_services/to-do-list.service';
import { Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task: any;
  validationErrors: string[] = [];

  constructor(public accountService: AccountService, private toastr: ToastrService, 
    private fb: UntypedFormBuilder, private router: Router, private toDoListServ: ToDoListService,
    private datePipe: DatePipe) { 

    }

  closeTask() {
    this.toDoListServ.closeTask(this.task).subscribe(() => {
    }, error => {
      this.validationErrors = error;
    })
  }

  // removeCategory() {
  //   this.toDoListServ.removeTask(this.task.id).subscribe(() => {
  //     this.category.splice(this.category.findIndex(p => p.id === categoryId), 1);
  //   })
  //   this.getCategories();
  // }

}
