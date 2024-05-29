import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { ExpensesService } from '../../_services/expenses.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormControl, FormGroup, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TableComponent } from '../../expenses/table/table.component';

@Component({
  selector: 'app-spendings-modal',
  templateUrl: './spendings-modal.component.html',
  styleUrls: ['./spendings-modal.component.css']
})
export class SpendingsModalComponent {
  @Input() expense: any;
  @Input() category: any;
  @Input() modalRef: any;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  contributors: any;
  spendingsForm: UntypedFormGroup;
  validationErrors: string[] = [];
  selected_contributors: string[] = [];
  spending_amounts: number[] = [];
  spendings: string[] = [];
  form: UntypedFormGroup;

  constructor(private expensesServ: ExpensesService, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.getCategoryContributors(this.expense.categoryId);
    this.initializeForm();
  }

  onChange(value: string): void {
    if (this.selected_contributors.includes(value)) {
      this.selected_contributors = this.selected_contributors.filter((item) => item !== value);
    } else {
      this.selected_contributors.push(value);
    }
  }

  close() {
    this.modalRef.close();
  }

  initializeForm() {
    this.spendingsForm = this.fb.group({
      splitter: ['', [Validators.required]],
      expenseId: [this.expense.id]
    })
  }

  getCategoryContributors(id: number) {
    this.expensesServ.getCategoryContributors(id).subscribe(contributors => {
      this.contributors = contributors;
    })
  }

  addSpendings() {
    if (this.spendingsForm.value['splitter'] === '0') {
      for (let contributor of this.selected_contributors) {
        this.spendings.push(contributor + ':' + (this.expense.amount/this.selected_contributors.length))
      }
    }
    var i = 0;
    for (let spend in this.spendings) {
      var data = this.spendings[spend]?.split(':');
      var name = data[0];
      var amount = data[1];
      this.form = this.fb.group({
        whoPaid: [this.expense.whoPaid],
        whoOwes: [name],
        amount: [Number(amount)],
        expenseId: [this.expense.id],
        categoryId: [this.expense.categoryId]
      })
      this.expensesServ.addSpending(this.form.value).subscribe(response => {
      }, error => {
        this.validationErrors = error;
      })
    }
  this.modalRef.close();
  }

  onKeyUp(contributor, email){
    var value = contributor + ':' + email;
    if (this.spendings.includes(value)) {
      this.spendings = this.spendings.filter((item) => item !== value);
    } else {
      this.spendings.push(value);
    }
  }

  round(priceToPay: number) {
    return (Math.round(priceToPay*100)/100).toFixed(2);
  }
}

