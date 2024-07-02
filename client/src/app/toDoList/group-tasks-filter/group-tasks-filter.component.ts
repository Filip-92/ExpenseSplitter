import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { ToDoListService } from '../../_services/to-do-list.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-group-tasks-filter',
  templateUrl: './group-tasks-filter.component.html',
  styleUrls: ['./group-tasks-filter.component.css']
})
export class GroupTasksFilterComponent {
  @Output() cancelRegister = new EventEmitter();
  @Input() tasks: any;
  @Input() id: number;
  @Input() taskGroup: any;
  dailyTasks: any;
  toDoListScheduleForm: UntypedFormGroup;
  toDoListTimespanForm: UntypedFormGroup;
  validationErrors: string[] = [];
  currentDate = new Date();
  group: boolean;
  filter: boolean;
  filterTasksBool: boolean;
  protected from: string;
  protected to: string;

  constructor(public accountService: AccountService, private toastr: ToastrService, private fb: UntypedFormBuilder, private toDoListServ: ToDoListService,
    private datePipe: DatePipe, private cookieService: CookieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeFormTimespan();
    //this.getToDoListGroupTasks(this.id);
    this.getDailyGroupToDoListTasks();
  }

  initializeForm() {
    this.toDoListScheduleForm = this.fb.group({
      taskDate: ['', Validators.required],
      name: ['', Validators.required],
      groupdId: [this.id]
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

  toggleFilter() {
    this.filter = !this.filter;
  }

  filterTasks() {
    this.toDoListServ.filterGroupTasks(this.datePipe.transform(this.toDoListTimespanForm.value.from, 'yyyy-MM-dd'), this.datePipe.transform(this.toDoListTimespanForm.value.to, 'yyyy-MM-dd'), this.id).subscribe(response => {
      this.tasks = response;
      this.filterTasksBool = true;
      //this.initializeForm();
    }, error => {
      this.validationErrors = error;
    })
  }

  getToDoListGroupTasks(id: number) {
    this.toDoListServ.getToDoListGroupTasks(id, 'all').subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  getDailyGroupToDoListTasks() {
    var id = +this.route?.snapshot?.paramMap?.get('id');

    this.toDoListServ.getDailyGroupToDoListTasks(id).subscribe(dailyTasks => {
      this.dailyTasks = dailyTasks;
    })
  }
}
