import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { ToDoListService } from '../../_services/to-do-list.service';
import { EditTaskModalComponent } from '../../modals/edit-task-modal/edit-task-modal.component';
import { IndividualTasksComponent } from '../individual-tasks/individual-tasks.component';
import { GroupTaskCardComponent } from '../group-task-card/group-task-card.component';

@Component({
  selector: 'app-task-card-form',
  templateUrl: './task-card-form.component.html',
  styleUrls: ['./task-card-form.component.css']
})
export class GroupTaskCardFormComponent {
  @Input() id: number;
  toDoListScheduleForm: UntypedFormGroup;
  toDoListTimespanForm: UntypedFormGroup;
  validationErrors: string[] = [];
  currentDate = new Date();
  group: boolean;

  constructor(public accountService: AccountService, private toastr: ToastrService, 
    private fb: UntypedFormBuilder, private router: Router, private toDoListServ: ToDoListService,
    private datePipe: DatePipe, private modalServ: NgbModal, private indivTaskComp: IndividualTasksComponent,
  private groupTaskComp: GroupTaskCardComponent) { 

    }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.toDoListScheduleForm = this.fb.group({
      taskDate: ['', Validators.required],
      name: ['', Validators.required],
      groupId: [this.id]
    }),
    this.toDoListTimespanForm = this.fb.group({
      from: [this.currentDate],
      to: [this.currentDate]
    })
  }

  cancel() {
    this.toDoListScheduleForm.reset();
  }

  addTask() {
    this.toDoListServ.addToDoListTask(this.toDoListScheduleForm.value).subscribe(response => {
      this.toastr.success('Pomyślnie dodano zadanie');
      this.toDoListScheduleForm.reset();
      if (this.id === undefined) {
        this.indivTaskComp.getToDoListTasks();
      } else {
        this.groupTaskComp.getToDoListGroupTasks(this.id);
      }
      this.initializeForm();
    }, error => {
      this.validationErrors = error;
    })
  }

}
