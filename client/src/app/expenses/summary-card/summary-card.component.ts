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
  changeCurrencyForm: UntypedFormGroup;
  isClosed: boolean;
  validationErrors: string[] = [];
  currencyName: string;
  newCurrency: any;
  currencyValue: number = 1;

  constructor(private expensesServ: ExpensesService, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.currencyName = this.category.currency;
  }


  initializeForm() {
    this.closeCategoryForm = this.fb.group({
      checkbox: [''],
      categoryId: [this.category.id]
    }),
    this.changeCurrencyForm = this.fb.group({
      currency: ['PLN']
    })
  }

  closeCategory() {
    this.expensesServ.closeCategory(this.category).subscribe(() => {
    }, error => {
      this.validationErrors = error;
    })
  }

  round(priceToPay: number) {
    return (Math.round(priceToPay*100)/100).toFixed(2);
  }

  changeCurrency() {
    console.log(this.changeCurrencyForm.value.currency)
    this.expensesServ.changeCurrency(this.expensesSum, this.category.currency, this.changeCurrencyForm.value.currency).subscribe(response => {
      this.newCurrency = JSON.parse(JSON.stringify(response));
      if (this.changeCurrencyForm.value.currency === 'PLN') {
        this.currencyValue = this.newCurrency?.data.PLN;
        this.currencyName = 'PLN';
      }
      if (this.changeCurrencyForm.value.currency === 'EUR') {
        this.currencyValue = this.newCurrency?.data.EUR;
        this.currencyName = 'EUR';
      }
      if (this.changeCurrencyForm.value.currency === 'USD') {
        this.currencyValue = this.newCurrency?.data.USD;
        this.currencyName = 'USD';
      }
      if (this.changeCurrencyForm.value.currency === 'GBP') {
        this.currencyValue = this.newCurrency?.data.GBP;
        this.currencyName = 'GBP';
      }
    })
  }
}
