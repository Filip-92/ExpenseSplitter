import { Component, Input } from '@angular/core';
import { ExpensesService } from '../../_services/expenses.service';
import { SpendingsModalComponent } from '../../modals/spendings-modal/spendings-modal.component';
import { EditSpendingsModalComponent } from '../../modals/edit-spendings-modal/edit-spendings-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() category: any;
  contributors: any;
  expenses: any;
  spendings: any;
  something: any;
  expensesSum: any;

  ngOnInit(): void {
    this.getCategoryContributors(this.category.id);
    this.getCategoryExpenses(this.category.id);
    this.getCategoryExpensesSum(this.category.id);
    this.getUserSpendings(this.category?.id, this.category.username);
  }

  constructor(private expensesServ: ExpensesService, private modalServ: NgbModal) { }

  refresh() {
    this.getCategoryContributors(this.category.id);
    this.getCategoryExpenses(this.category.id);
    this.getCategoryExpensesSum(this.category.id);
    this.getUserSpendings(this.category?.id, this.category.username);
  }

  getCategoryContributors(id: number) {
    this.expensesServ.getCategoryContributors(id).subscribe(contributors => {
      this.contributors = contributors;
      for (let contributor of this.contributors) {
        this.getUserSpendings(this.category?.id, contributor.username);
      }
    })
  }

  getCategoryExpenses(id: number) {
    this.expensesServ.getCategoryExpenses(id).subscribe(expenses => {
      this.expenses = expenses;
    })
  }

  getCategoryExpensesSum(id: number) {
    this.expensesServ.getCategoryExpensesSum(id).subscribe(expenses => {
      this.expensesSum = expenses;
    })
  }

  getUserSpendings(id: number, username: string) {
    this.expensesServ.getUserSpendings(id, username).subscribe(spendings => {
      this.spendings = spendings;
    })
  }

}
