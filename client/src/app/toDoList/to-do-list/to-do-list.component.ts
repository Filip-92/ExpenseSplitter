import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToDoListService } from '../../_services/to-do-list.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskModalComponent } from '../../modals/edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
  providers: [DatePipe]
})
export class ToDoListComponent {
  @Output() cancelRegister = new EventEmitter();
  toDoListScheduleForm: UntypedFormGroup;
  toDoListTimespanForm: UntypedFormGroup;
  validationErrors: string[] = [];
  dailyTasks: any;
  tasks: any;
  currentDate = new Date();
  group: boolean;
  
  constructor(public accountService: AccountService, private toDoListServ: ToDoListService, private datePipe: DatePipe) { 

    }

  ngOnInit(): void {
    this.getToDoListTasks();
    //this.getDailyToDoListTasks();
  }


  getToDoListTasks() {
    this.toDoListServ.getToDoListTasks().subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  // getDailyToDoListTasks() {
  //   this.toDoListServ.getDailyToDoListTasks(this.datePipe.transform(this.currentDate, 'yyyy-MM-dd')).subscribe(tasks => {
  //     this.dailyTasks = tasks;
  //   })
  // }

  changeTab() {
    this.group = !this.group;
    if (this.group === true) {
      this.getToDoListTasks();
    } else {
      this.getToDoListTasks();
    }
  }

}
