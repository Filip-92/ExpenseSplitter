import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { NgControl, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ToDoListService } from '../../_services/to-do-list.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent {
  @Input() task: any;
  @Input() modalRef: any;
  validationErrors: string[] = [];
  @ViewChild('editTaskForm') editTaskForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editTaskForm?.dirty) {
      $event.returnValue = true;
    }
  }

  bsConfig: Partial<BsDatepickerConfig>;


  constructor(public accountService: AccountService, private toastr: ToastrService, 
    private fb: UntypedFormBuilder, private router: Router, private toDoListServ: ToDoListService,
    private datePipe: DatePipe, private modalServ: NgbModal) { 
      this.bsConfig = {
        containerClass: 'theme-red',
        dateInputFormat: 'DD MMMM YYYY'
      }
    }

  ngOnInit(): void {
  }

  editTask() {
    console.log(this.editTaskForm.value.name)
    this.toDoListServ.updateTask(this.task).subscribe(() => {
      console.log(this.editTaskForm.value.name)
      this.editTaskForm.reset(this.editTaskForm.value);
      this.modalRef.close();
      this.toastr.success('Pomyślnie edytowano zadanie');
    }, error => {
      this.validationErrors = error;
    })
  }

  close() {
    this.modalRef.close();
  }

}
