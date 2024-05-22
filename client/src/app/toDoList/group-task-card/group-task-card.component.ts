import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDoListService } from '../../_services/to-do-list.service';
import { EditTaskModalComponent } from '../../modals/edit-task-modal/edit-task-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-task-card',
  templateUrl: './group-task-card.component.html',
  styleUrls: ['./group-task-card.component.css']
})
export class GroupTaskCardComponent {
  id: number = +this.route?.snapshot?.paramMap?.get('id');
  group: any;
  contributors: any;
  tasks: any;
  validationErrors: string[] = [];


  constructor(private route: ActivatedRoute, private toDoListServ: ToDoListService, private modalServ: NgbModal) {}

  ngOnInit() {
    this.getGroup(this.id);
    //this.getGroupContributors(this.id);
    this.getToDoListGroupTasks(this.id);
   }

   getGroup(id: number) {
    this.toDoListServ.getGroup(id).subscribe(group => {
      this.group = group;
    })
  }

  getGroupContributors(id: number) {
    this.toDoListServ.getGroupContributors(id).subscribe(contributors => {
      this.contributors = contributors;
    })
  }

  getToDoListGroupTasks(id: number) {
    this.toDoListServ.getToDoListGroupTasks(id).subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  closeTask(taskId: number) {
    this.toDoListServ.closeTask(taskId).subscribe(() => {
    }, error => {
      this.validationErrors = error;
    })
  }

  removeTask(taskId: number) {
    this.toDoListServ.removeTask(taskId).subscribe(() => {
      this.tasks.splice(this.tasks.findIndex(p => p.id === taskId), 1);
    })
    this.getToDoListGroupTasks(this.id);
  }

  openEditTaskModal(task: any) {
    const modalRef = this.modalServ.open(EditTaskModalComponent);
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.modalRef = modalRef;
  }

}
