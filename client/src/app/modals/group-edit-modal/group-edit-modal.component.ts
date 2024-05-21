import { DatePipe } from '@angular/common';
import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { ToDoListService } from '../../_services/to-do-list.service';

@Component({
  selector: 'app-group-edit-modal',
  templateUrl: './group-edit-modal.component.html',
  styleUrls: ['./group-edit-modal.component.css']
})
export class GroupEditModalComponent {
  @Input() group: any;
  @Input() modalRef: any;
  validationErrors: string[] = [];
  @ViewChild('editGroupForm') editGroupForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editGroupForm?.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(public accountService: AccountService, private toastr: ToastrService, 
    private fb: UntypedFormBuilder, private router: Router, private toDoListServ: ToDoListService,
    private datePipe: DatePipe, private modalServ: NgbModal) { 
    }

  ngOnInit(): void {
  }

  editGroup() {
    this.toDoListServ.updateGroup(this.group).subscribe(() => {
      this.editGroupForm.reset(this.editGroupForm.value);
      this.modalRef.close();
      this.toastr.success('Pomyślnie edytowano grupę');
    }, error => {
      this.validationErrors = error;
    })
  }

  close() {
    this.modalRef.close();
  }
}
