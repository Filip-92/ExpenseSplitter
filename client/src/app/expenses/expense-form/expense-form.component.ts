import { Component, Input, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ExpensesService } from '../../_services/expenses.service';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent {
  expensesForm: UntypedFormGroup;
  validationErrors: string[] = [];
  @Input() category: any;
  @ViewChild(TableComponent) table;
  expenses: any;
  contributors: any;

  ngOnInit(): void {
    this.initializeForm();
    this.getCategoryExpenses(this.category.id);
    this.getCategoryContributors(this.category.id);
  }

  constructor(private fb: UntypedFormBuilder, private toastr: ToastrService, private expensesServ: ExpensesService, private tableComp: TableComponent) { }

  initializeForm() {
    this.expensesForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      amount: ['', [Validators.required]],
      categoryId: [this.category.id],
      whoPaid: [this.category.username]
    })
  }

  addExpense() {
    this.expensesServ.addExpense(this.expensesForm.value).subscribe(response => {
      console.log(this.expensesForm.value)
      this.toastr.success('Pomyślnie dodano wydatek');
      this.expensesForm.reset();
      this.getCategoryExpenses(this.category.id);
      this.initializeForm();
    }, error => {
      this.validationErrors = error;
    })
  }

  getCategoryExpenses(id: number) {
    this.expensesServ.getCategoryExpenses(id).subscribe(expenses => {
      this.tableComp.expenses = expenses;
    })
  }

  getCategoryContributors(id: number) {
    this.expensesServ.getCategoryContributors(id).subscribe(contributors => {
      this.contributors = contributors;
    })
  }

}
