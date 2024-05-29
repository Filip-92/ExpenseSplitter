import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { ToDoListService } from '../../_services/to-do-list.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
  providers: [DatePipe]
})
export class ToDoListComponent {
  @Output() cancelRegister = new EventEmitter();
  dailyTasks: any;
  tasks: any;
  currentDate = new Date();
  group: boolean;
  
  constructor(public accountService: AccountService, private toDoListServ: ToDoListService, private datePipe: DatePipe,
    private location: Location, private router: Router
  ) { 

    }

  ngOnInit(): void {
    this.getToDoListTasks();
    if (this.router.url.includes('group')) {
      this.group = true;
    }
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
      this.location.replaceState("to-do-list/group");
    } else {
      this.getToDoListTasks();
      this.location.replaceState("to-do-list");
    }
  }

}
