import { Component, Input } from '@angular/core';
import { ExpensesService } from '../../_services/expenses.service';

@Component({
  selector: 'app-expense-card',
  templateUrl: './expense-card.component.html',
  styleUrls: ['./expense-card.component.css']
})
export class ExpenseCardComponent {
  @Input() expense: any;
  @Input() contributors: any;
  @Input() category: any;
  spendings: any;
  expensesArray: number[] = [];
  sum: number;
  more: boolean;

  ngOnInit(): void {
    this.getExpenseSpendings(this.expense.id);
  }

  constructor(private expensesServ: ExpensesService) { }


  getExpenseSpendings(expenseId: number) {
    this.expensesServ.getExpenseSpendings(expenseId).subscribe(spendings => {
      this.spendings = spendings;
      for (let spending of this.spendings) {
        this.expensesArray.push(spending.amount)
        this.sum = this.expensesArray.reduce((acc, cur) => acc + cur, 0);
      }
    })
  }

  showMore() {
    this.more = !this.more;
  }

  round(priceToPay: number) {
    return Math.round(priceToPay);
  }

}
