import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ExpensesService } from '../../_services/expenses.service';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.css']
})
export class SummaryCardComponent {
  @Input() expensesSum: any;
  @Input() expenses: any;
  @Input() category: any;
  @Input() contributors: any;
  closeCategoryForm: UntypedFormGroup;
  isClosed: boolean;
  validationErrors: string[] = [];

  constructor(private expensesServ: ExpensesService, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.closeCategoryForm = this.fb.group({
      checkbox: [''],
      categoryId: [this.category.id]
    })
  }

  closeCategory() {
    this.expensesServ.closeCategory(this.category).subscribe(() => {
    }, error => {
      this.validationErrors = error;
    })
  }
}
