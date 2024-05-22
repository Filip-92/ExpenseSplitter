import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EditTaskModalComponent } from '../../modals/edit-task-modal/edit-task-modal.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { ToDoListService } from '../../_services/to-do-list.service';

@Component({
  selector: 'app-individual-tasks',
  templateUrl: './individual-tasks.component.html',
  styleUrls: ['./individual-tasks.component.css']
})
export class IndividualTasksComponent {
  @Output() cancelRegister = new EventEmitter();
  @Input() tasks: any;
  toDoListScheduleForm: UntypedFormGroup;
  toDoListTimespanForm: UntypedFormGroup;
  validationErrors: string[] = [];
  currentDate = new Date();
  group: boolean;

  constructor(public accountService: AccountService, private toastr: ToastrService, 
    private fb: UntypedFormBuilder, private router: Router, private toDoListServ: ToDoListService,
    private datePipe: DatePipe, private modalServ: NgbModal) { 

    }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.toDoListScheduleForm = this.fb.group({
      taskDate: ['', Validators.required],
      name: ['', Validators.required]
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
      this.getToDoListTasks();
      this.initializeForm();
    }, error => {
      this.validationErrors = error;
    })
  }

  filterTasks() {
    this.toDoListServ.filterTasks(this.datePipe.transform(this.toDoListTimespanForm.value.from, 'yyyy-MM-dd'), this.datePipe.transform(this.toDoListTimespanForm.value.to, 'yyyy-MM-dd')).subscribe(response => {
      console.log(this.toDoListTimespanForm)
      this.tasks = response;
      //this.initializeForm();
    }, error => {
      this.validationErrors = error;
    })
  }

  getToDoListTasks() {
    this.toDoListServ.getToDoListTasks().subscribe(tasks => {
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
    this.getToDoListTasks();
  }

  openEditTaskModal(task: any) {
    const modalRef = this.modalServ.open(EditTaskModalComponent);
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.modalRef = modalRef;
  }


}
