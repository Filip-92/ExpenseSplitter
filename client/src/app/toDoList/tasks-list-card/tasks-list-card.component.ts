import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { ToDoListService } from '../../_services/to-do-list.service';
import { EditTaskModalComponent } from '../../modals/edit-task-modal/edit-task-modal.component';
import { GroupTaskCardComponent } from '../group-task-card/group-task-card.component';
import { IndividualTasksComponent } from '../individual-tasks/individual-tasks.component';

@Component({
  selector: 'app-tasks-list-card',
  templateUrl: './tasks-list-card.component.html',
  styleUrls: ['./tasks-list-card.component.css']
})
export class TasksListCardComponent {
  @Input() tasks: any;
  @Input() dailyTasks: any;
  @Input() id: number;
  @Input() filterTasksBool: boolean;
  validationErrors: string[] = [];
  currentDate = new Date();
  done: boolean;
  toDo: boolean;

  constructor(public accountService: AccountService, private toDoListServ: ToDoListService,
    private modalServ: NgbModal, private indivTaskComp: IndividualTasksComponent,
    private groupTaskCardComp: GroupTaskCardComponent) { 

    }

  closeTask(task: any) {
    this.toDoListServ.closeTask(task).subscribe(() => {
    }, error => {
      this.validationErrors = error;
    })
  }

  removeTask(taskId: number) {
    this.toDoListServ.removeTask(taskId).subscribe(() => {
      this.tasks.splice(this.tasks.findIndex(p => p.id === taskId), 1);
    })
    if (this.id === undefined || this.id === 0) {
      this.indivTaskComp.getToDoListTasks();
    } else {
      this.groupTaskCardComp.getToDoListGroupTasks(this?.id);
    }
  }

  openEditTaskModal(task: any) {
    const modalRef = this.modalServ.open(EditTaskModalComponent);
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.modalRef = modalRef;
  }

  toggleDone() {
    this.done = !this.done;
    this.toDo = false;
  }

  toggleToDo() {
    this.toDo = !this.toDo;
    this.done = false;
  }

  allTasks() {
    this.toDo = false;
    this.done = false;
  }
}
