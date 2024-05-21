import { Component, Input } from '@angular/core';
import { ExpensesService } from '../../_services/expenses.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpendingsModalComponent } from '../../modals/spendings-modal/spendings-modal.component';
import { EditSpendingsModalComponent } from '../../modals/edit-spendings-modal/edit-spendings-modal.component';

@Component({
  selector: 'app-table-button',
  templateUrl: './table-button.component.html',
  styleUrls: ['./table-button.component.css']
})
export class TableButtonComponent {
  @Input() category: any;
  @Input() expense: any;
  @Input() contributors: any;
  spendings: any;


  ngOnInit(): void {
    this.getExpenseSpendings(this.expense.id);
  }

  constructor(private expensesServ: ExpensesService, private modalServ: NgbModal) { }

  openSpendingsModal(expense: any) {
    const modalRef = this.modalServ.open(SpendingsModalComponent);
    modalRef.componentInstance.category = this.category;
    modalRef.componentInstance.expense = expense;
    modalRef.componentInstance.modalRef = modalRef;
  }

  openEditSpendingsModal(expense: any) {
    const modalRef = this.modalServ.open(EditSpendingsModalComponent);
    modalRef.componentInstance.expense = expense;
    modalRef.componentInstance.contributors = this.contributors;
    modalRef.componentInstance.modalRef = modalRef;
  }

  getExpenseSpendings(expenseId: number) {
    this.expensesServ.getExpenseSpendings(expenseId).subscribe(response => {
      this.spendings = response;
    })
  }

}
