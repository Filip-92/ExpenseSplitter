import { Component, Input } from '@angular/core';
import { ExpensesService } from '../../_services/expenses.service';

@Component({
  selector: 'app-summarical-expenses',
  templateUrl: './summarical-expenses.component.html',
  styleUrls: ['./summarical-expenses.component.css']
})
export class SummaricalExpensesComponent {
  @Input() username: string;
  @Input() category: any;
  @Input() contributors: any;
  @Input() currencyValue: number;
  @Input() currencyName: string;
  expenses: any;
  spendingsSum: any;
  expensesArray: number[] = [];
  sum: number;

  ngOnInit(): void {
    this.getUserExpenses(this.category?.id, this.username);
    this.getUserSpendings(this.category?.id, this.username);
  }

  constructor(private expensesServ: ExpensesService) { }

  getUserExpenses(id: number, username: string) {
    this.expensesServ.getUserExpensesSum(id, username).subscribe(expenses => {
      this.expenses = expenses;
    })
  }

  getUserSpendings(id: number, username: string) {
    this.expensesServ.getUserSpendingsSum(id, username).subscribe(sum => {
      this.spendingsSum = sum;
    })
  }

  round(priceToPay: number) {
    return (Math.round(priceToPay*100)/100).toFixed(2);
  }

}
