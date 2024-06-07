import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoListService } from '../../_services/to-do-list.service';
import { EditTaskModalComponent } from '../../modals/edit-task-modal/edit-task-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-group-task-card',
  templateUrl: './group-task-card.component.html',
  styleUrls: ['./group-task-card.component.css']
})
export class GroupTaskCardComponent {
  @Input() tasks: any;
  id: number = +this.route?.snapshot?.paramMap?.get('id');
  group: any;
  contributors: any;
  validationErrors: string[] = [];
  addToGroup: boolean;
  isInGroup: any;

  constructor(private route: ActivatedRoute, private toDoListServ: ToDoListService, private modalServ: NgbModal,
    private _location: Location, private toastr: ToastrService, private router: Router
  ) {}

  ngOnInit() {
    if ("user" in localStorage) {
      this.checkIfUserInContributors(this.id)
    } else {
      this.toastr.error('Zaloguj się aby mieć dostęp')
      this.router.navigateByUrl('/')
    }
    

   }

   getGroup(id: number) {
    this.toDoListServ.getGroup(id).subscribe(group => {
      this.group = group;
    })
  }


  checkIfUserInContributors(id: number) {
    this.toDoListServ.checkIfUserInContributors(id).subscribe(isInGroup => {
      this.isInGroup = isInGroup;
      if (isInGroup) {
        this.getGroup(this.id);
        this.getGroupContributors(this.id);
        this.getToDoListGroupTasks(this.id);
      } else {
        this.toastr.error('Nie masz dostępu do tej grupy')
        this.router.navigateByUrl('/')
      }
    })
  }

  backClicked() {
    this._location.back();
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
      this.tasks?.splice(this.tasks?.findIndex(p => p.id === taskId), 1);
    })
    this.getToDoListGroupTasks(this.id);
  }

  openEditTaskModal(task: any) {
    const modalRef = this.modalServ.open(EditTaskModalComponent);
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.modalRef = modalRef;
  }

  addToGroupToggle() {
    this.addToGroup = !this.addToGroup;
  }

}
