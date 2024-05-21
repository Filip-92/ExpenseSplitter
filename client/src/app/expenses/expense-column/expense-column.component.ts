import { Component, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ExpensesService } from '../../_services/expenses.service';

@Component({
  selector: 'app-expense-column',
  templateUrl: './expense-column.component.html',
  styleUrls: ['./expense-column.component.css']
})
export class ExpenseColumnComponent {
  @Input() category: any;
  @Input() username: string;
  @Input() expense: any;

  expenses: any;
  spendings: any;
  expensesArray: number[] = [];
  sum: number;

  ngOnInit(): void {
    this.getCategoryExpenses(this.category.id, this.username);
    this.getExpenseSpendings(this.expense.id);
  }

  constructor(private expensesServ: ExpensesService) { }

  getCategoryExpenses(id: number, username: string) {
    this.expensesServ.getUserExpenses(id, username).subscribe(expenses => {
      this.expenses = expenses;
      for (let expense of this.expenses) {
        if (expense.whoPaid === this.username)
          this.expensesArray.push(expense.amount)
          this.sum = this.expensesArray.reduce((acc, cur) => acc + cur, 0);
      }
    })
  }

  getExpenseSpendings(expenseId: number) {
    this.expensesServ.getExpenseSpendings(expenseId).subscribe(spendings => {
      this.spendings = spendings;
    })
  }

  round(priceToPay: number) {
    return (Math.round(priceToPay*100)/100).toFixed(2);
  }

}
