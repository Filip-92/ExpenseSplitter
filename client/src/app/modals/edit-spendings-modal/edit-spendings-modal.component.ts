import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { ExpensesService } from '../../_services/expenses.service';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-spendings-modal',
  templateUrl: './edit-spendings-modal.component.html',
  styleUrls: ['./edit-spendings-modal.component.css']
})
export class EditSpendingsModalComponent {
  @Input() expense: any;
  @Input() modalRef: any;
  @Input() contributors: any;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  spendings: any
  spendingsNew: string[] = [];
  selected_contributors: string[] = [];
  spendingsForm: UntypedFormGroup;
  form: UntypedFormGroup;
  validationErrors: string[] = [];
  removed: string = '';
  addNewCont: any;
  sum: any;
  editSpending: any;

  constructor(private expensesServ: ExpensesService, private fb: UntypedFormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getExpenseSpendings(this.expense.id);
    this.initializeForm();
    this.verifyIfContributorsAvailable();
    this.checkIfSpendingsSumUp(this.expense.id);
  }

  getExpenseSpendings(expenseId: number) {
    this.expensesServ.getExpenseSpendings(expenseId).subscribe(response => {
      this.spendings = response;
    })
    this.verifyIfContributorsAvailable();
  }

  verifyIfContributorsAvailable() {
    this.expensesServ.checkIfContributorsAvailable(this.expense.categoryId, this.expense.id).subscribe(response => {
      this.addNewCont = response;
    })
  }

  onChange(value: string): void {
    if (this.selected_contributors.includes(value)) {
      this.selected_contributors = this.selected_contributors.filter((item) => item !== value);
    } else {
      this.selected_contributors.push(value);
    }
  }

  initializeForm() {
    this.spendingsForm = this.fb.group({
      amount: ['', Validators.required],
      expenseId: [this.expense.id]
    })
  }

  addSpendings() {
    if (this.spendingsForm.value.amount + this.sum === this.expense.amount) {
      for (let spend in this.spendingsNew) {
        var data = this.spendingsNew[spend]?.split(':');
        var name = data[0];
        var amount = data[1];
        this.form = this.fb.group({
          whoPaid: [this.expense.whoPaid],
          whoOwes: [name],
          amount: [Number(amount), Validators.required],
          expenseId: [this.expense.id],
          categoryId: [this.expense.categoryId]
        })
        this.expensesServ.addSpending(this.form.value).subscribe(response => {
        }, error => {
          this.validationErrors = error;
        })
      }
      this.modalRef.close();
    } else if (this.spendingsForm.value.amount + this.sum < this.expense.amount) {
      this.toastr.warning('Kwota mniejsza niż całkowity wydatek');
    } else {
      this.toastr.warning('Kwota przekracza całkowity wydatek');
    }
  }

  checkIfSpendingsSumUp(expenseId: number) {
    this.expensesServ.getExpenseSpendingsSum(expenseId).subscribe(response => {
      this.sum = response;
    })
  }

  onKeyUp(contributor, amount){
    var value = contributor + ':' + amount;
    if (this.spendingsNew.includes(value)) {
      this.spendings = this.spendingsNew.filter((item) => item !== value);
    } else {
      this.spendingsNew.push(value);
    }
  }

  removeSpending(spending: any) {
    this.expensesServ.removeSpending(spending.id).subscribe(() => {
      this.spendings.splice(this.spendings.findIndex(p => p.id === spending.id), 1);
    })
    this.getExpenseSpendings(this.expense.id);
    this.initializeForm();
    this.verifyIfContributorsAvailable();
    this.removed = spending.whoPaid;
  }

  editSpendingAmount(spending: any, editSpending: any) {
    this.expensesServ.updateSpendingAmount(spending, editSpending).subscribe(() => {
      this.toastr.success('Pomyślnie edytowano kwotę');
      this.checkIfSpendingsSumUp(this.expense.id);
    }, error => {
      this.validationErrors = error;
    })
  }

  onKeyUp2(newValue){
    var value = newValue;
    this.editSpending = value;
  }

  close() {
    this.modalRef.close();
  }

  round(priceToPay: number) {
    return (Math.round(priceToPay*100)/100).toFixed(2);
  }

}
