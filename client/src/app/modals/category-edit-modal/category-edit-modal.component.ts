import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from '../../_services/expenses.service';

@Component({
  selector: 'app-category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {
  @Input() category: any;
  @Input() modalRef: any;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private expenseServ: ExpensesService, private toastr: ToastrService) { }

  validationErrors: string[] = [];

  ngOnInit(): void {

  }

  editCategoryName() {
    this.expenseServ.updateCategoryName(this.category).subscribe(() => {
      this.editForm.reset(this.editForm.value);
      this.modalRef.close();
      this.toastr.success('Pomyślnie edytowano nazwę kategorii');
    }, error => {
      this.validationErrors = error;
    })
  }

  close() {
    this.modalRef.close();
  }
}
