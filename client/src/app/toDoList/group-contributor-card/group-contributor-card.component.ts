import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { ToDoListService } from '../../_services/to-do-list.service';

@Component({
  selector: 'app-group-contributor-card',
  templateUrl: './group-contributor-card.component.html',
  styleUrls: ['./group-contributor-card.component.css']
})
export class GroupContributorCardComponent {
  @Input() contributor: any;
  @Input() contributors: any;
  edit: boolean;
  validationErrors: string[] = [];
  @ViewChild('editContributorForm') editContributorForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editContributorForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private fb: UntypedFormBuilder, private toastr: ToastrService, private toDoListServ: ToDoListService) {
   }
  
  editToggle() {
    this.edit = !this.edit;
  }

  editContributor() {
    this.toDoListServ.updateContributor(this.contributor).subscribe(() => {
      this.editContributorForm.reset(this.editContributorForm.value);;
      this.toastr.success('Pomyślnie edytowano zadanie');
      this.editToggle();
    }, error => {
      this.validationErrors = error;
    })
  }

}
