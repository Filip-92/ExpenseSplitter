import { Component, Input } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ToDoListService } from '../../_services/to-do-list.service';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskModalComponent } from '../../modals/edit-task-modal/edit-task-modal.component';
import { GroupTaskCardComponent } from '../group-task-card/group-task-card.component';
import { IndividualTasksComponent } from '../individual-tasks/individual-tasks.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task: any;
  @Input() id: number;
  tasks: any;
  validationErrors: string[] = [];
  commentField: boolean;
  commentForm: UntypedFormGroup;
  currentDate = new Date();
  comments: any;

  constructor(public accountService: AccountService, private toDoListServ: ToDoListService,
    private modalServ: NgbModal, private indivTaskComp: IndividualTasksComponent, private groupTaskComp: GroupTaskCardComponent,
     private fb: UntypedFormBuilder, private toastr: ToastrService) { 

    }

  ngOnInit(): void {
    this.getTaskComments(this.task.id);
  }

  closeTask() {
    this.toDoListServ.closeTask(this.task).subscribe(() => {
    }, error => {
      this.validationErrors = error;
    })
  }

  removeTask(taskId: number) {
    this.toDoListServ.removeTask(taskId).subscribe(() => {
      if (this.id === undefined) {
        this.indivTaskComp?.tasks?.splice(this.indivTaskComp?.tasks?.findIndex(p => p.id === taskId), 1);
      } else {
        this.groupTaskComp?.tasks?.splice(this.groupTaskComp?.tasks?.findIndex(p => p.id === taskId), 1);
      }
    })
    if (this.id === undefined || this.id === 0) {
      this.indivTaskComp?.getToDoListTasks();
    } else {
      this.groupTaskComp?.getToDoListGroupTasks(this.id);
    }
  }

  openEditTaskModal(task: any) {
    const modalRef = this.modalServ.open(EditTaskModalComponent);
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.modalRef = modalRef;
  }

  commentToggle() {
    this.commentField = !this.commentField;
    this.initializeForm();
  }
  
  initializeForm() {
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
      uploaded: [this.currentDate]
    })
  }

  addComment(taskId: number) {
      this.toDoListServ.addComment(this.commentForm.value, taskId).subscribe(response => {
        this.toastr.success('Pomyślnie dodano komentarz');
        this.commentForm.reset();
      }, error => {
        this.validationErrors = error;
      })

  }

  getTaskComments(id: number) {
    this.toDoListServ.getTaskComments(id).subscribe(comments => {
      this.comments = comments;
    })
  }

  cancel() {
    this.commentForm.reset();
    this.commentField = false;
  }

}
