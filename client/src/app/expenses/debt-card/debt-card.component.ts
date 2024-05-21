import { Component, Input } from '@angular/core';
import { ExpensesService } from '../../_services/expenses.service';

@Component({
  selector: 'app-debt-card',
  templateUrl: './debt-card.component.html',
  styleUrls: ['./debt-card.component.css']
})
export class DebtCardComponent {
  @Input() category: any;
  @Input() whoPaid: any;
  @Input() whoOwes: any;
  debt: any;

  ngOnInit(): void {
    this.getDebtsSum(this.category.id, this.whoPaid, this.whoOwes);
  }

  constructor(private expensesServ: ExpensesService) { }

  getDebtsSum(id: number, whoPaid: string, whoOwes: string) {
    this.expensesServ.getDebtsSum(id, whoPaid, whoOwes).subscribe(response => {
      this.debt = response;
    })
  }

  round(priceToPay: number) {
    return (Math.round(priceToPay*100)/100).toFixed(2);
  }

}
