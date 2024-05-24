import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { ToDoListService } from '../../_services/to-do-list.service';

@Component({
  selector: 'app-group-tasks-filter',
  templateUrl: './group-tasks-filter.component.html',
  styleUrls: ['./group-tasks-filter.component.css']
})
export class GroupTasksFilterComponent {
  @Output() cancelRegister = new EventEmitter();
  @Input() tasks: any;
  @Input() id: number;
  toDoListScheduleForm: UntypedFormGroup;
  toDoListTimespanForm: UntypedFormGroup;
  validationErrors: string[] = [];
  currentDate = new Date();
  group: boolean;
  filter: boolean;
  filterTasksBool: boolean;

  constructor(public accountService: AccountService, private toastr: ToastrService, 
    private fb: UntypedFormBuilder, private router: Router, private toDoListServ: ToDoListService,
    private datePipe: DatePipe, private modalServ: NgbModal) { }

  ngOnInit(): void {
    this.initializeForm();
    //this.getToDoListGroupTasks(this.id);
  }

  initializeForm() {
    this.toDoListScheduleForm = this.fb.group({
      taskDate: ['', Validators.required],
      name: ['', Validators.required],
      groupdId: [this.id]
    }),
    this.toDoListTimespanForm = this.fb.group({
      from: [this.currentDate],
      to: [this.currentDate]
    })
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
    this.toDoListServ.getToDoListGroupTasks(id).subscribe(tasks => {
      this.tasks = tasks;
    })
  }


}
