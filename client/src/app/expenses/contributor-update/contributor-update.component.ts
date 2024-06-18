import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder } from '@angular/forms';
import { User } from '../../_models/user';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from '../../_services/expenses.service';

@Component({
  selector: 'app-contributor-update',
  templateUrl: './contributor-update.component.html',
  styleUrls: ['./contributor-update.component.css']
})
export class ContributorUpdateComponent {
  @Input() contributor: any;
  @Input() contributors: any;
  @Input() user: User;
  @Input() category: any;
  edit: boolean;
  validationErrors: string[] = [];
  @ViewChild('editContributorForm') editContributorForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editContributorForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private fb: UntypedFormBuilder, private toastr: ToastrService, private expensesServ: ExpensesService) {
  }
 
 editToggle() {
   this.edit = !this.edit;
 }

  editContributor() {
    if (this.category.username === this.user.username) {
      this.expensesServ.updateContributor(this.contributor).subscribe(() => {
        this.editContributorForm.reset(this.editContributorForm.value);;
        this.toastr.success('Pomyślnie edytowano zadanie');
        this.editToggle();
      }, error => {
        this.validationErrors = error;
      })
    } else {
      this.toastr.error('Musisz być administratorem grupy, żeby to zrobić')
    }
  }
}
