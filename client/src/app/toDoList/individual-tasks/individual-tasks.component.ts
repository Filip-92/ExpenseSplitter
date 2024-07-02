import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EditTaskModalComponent } from '../../modals/edit-task-modal/edit-task-modal.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { ToDoListService } from '../../_services/to-do-list.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-individual-tasks',
  templateUrl: './individual-tasks.component.html',
  styleUrls: ['./individual-tasks.component.css']
})
export class IndividualTasksComponent {
  @Output() cancelRegister = new EventEmitter();
  @Input() tasks: any;
  @Input() dailyTasks: any;
  toDoListScheduleForm: UntypedFormGroup;
  toDoListTimespanForm: UntypedFormGroup;
  validationErrors: string[] = [];
  currentDate = new Date();
  group: boolean;
  filter: boolean;
  filterTasksBool: boolean;
  protected from: string;
  protected to: string;

  constructor(public accountService: AccountService, private toastr: ToastrService, private toDoListServ: ToDoListService, 
    private fb: UntypedFormBuilder, private cookieService: CookieService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeFormTimespan();
  }

  initializeForm() {
    this.toDoListScheduleForm = this.fb.group({
      taskDate: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  initializeFormTimespan() {
    this.from = this.cookieService.get('from');
    this.to = this.cookieService.get('to');
    if (this.from === undefined || this.to === undefined) {
      this.toDoListTimespanForm = this.fb.group({
        from: [this.currentDate],
        to: [this.currentDate]
      })
    } else {
      this.toDoListTimespanForm = this.fb.group({
        from: [new Date(this.from)],
        to: [new Date(this.to)]
      })
    }
  }

  cancel() {
    this.toDoListScheduleForm.reset();
  }

  //this.toDoListTimespanForm.value.from

  toggleFilter() {
    this.filter = !this.filter;
  }

  filterTasks() {
    this.toDoListServ.filterTasks(this.datePipe.transform(this.toDoListTimespanForm.value.from, 'yyyy-MM-dd'), this.datePipe.transform(this.toDoListTimespanForm.value.to, 'yyyy-MM-dd')).subscribe(response => {
      this.tasks = response;
      this.filterTasksBool = true;
      this.setCookie('from', String(this.datePipe.transform(this.toDoListTimespanForm.value.from, 'yyyy-MM-dd')));
      this.from = this.cookieService.get('from');
      this.setCookie('to', String(this.datePipe.transform(this.toDoListTimespanForm.value.to, 'yyyy-MM-dd')));
      this.to = this.cookieService.get('to');
    }, error => {
      this.validationErrors = error;
    })
  }

  setCookie(date: string, something: string) {
    this.cookieService.set(date, something, 10);
  }

  getToDoListTasks() {
    this.toDoListServ.getToDoListTasks('all').subscribe(tasks => {
      this.tasks = tasks;
    })
  }

}
