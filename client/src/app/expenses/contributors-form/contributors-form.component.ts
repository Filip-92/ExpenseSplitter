import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from '../../_services/expenses.service';
import { take } from 'rxjs/operators';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';

@Component({
  selector: 'app-contributors-form',
  templateUrl: './contributors-form.component.html',
  styleUrls: ['./contributors-form.component.css']
})
export class ContributorsFormComponent {
  contributorForm: UntypedFormGroup;
  addYourselfForm: UntypedFormGroup;
  validationErrors: string[] = [];
  @Input() category: any;
  contributors: any;
  nr: number;
  user: User;
  alreadyAdded: boolean;

  constructor(private fb: UntypedFormBuilder, private toastr: ToastrService, private expensesServ: ExpensesService,
    private accountService: AccountService, private expenseForm: ExpenseFormComponent) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.initializeForm();
    this.getCategoryContributors(this.category.id);
  }

  initializeForm() {
    this.contributorForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$')]],
      categoryId: [this.category.id]
    })
    this.addYourselfForm = this.fb.group({
      username: [this.user.username, []],
      email: [this.user.email, []],
      categoryId: [this.category.id, []]
    })
  }

  addContributor(form: any) {
    this.expensesServ.addContributor(form).subscribe(response => {
      this.toastr.success('Pomyślnie dodano wydatek');
      this.contributorForm.reset();
      this.getCategoryContributors(this.category.id);
      this.initializeForm();
    }, error => {
      this.validationErrors = error;
    })
  }

  getCategoryContributors(id: number) {
    this.expensesServ.getCategoryContributors(id).subscribe(contributors => {
      this.contributors = contributors;
      for (let contributor of this.contributors) {
        if (contributor.username === this.user.username) {
          this.alreadyAdded = true;
        }
      }
    })
  }

}
