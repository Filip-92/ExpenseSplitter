import { Component, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { ExpensesService } from '../../_services/expenses.service';
import { ToDoListService } from '../../_services/to-do-list.service';

@Component({
  selector: 'app-group-contributors-form',
  templateUrl: './group-contributors-form.component.html',
  styleUrls: ['./group-contributors-form.component.css']
})
export class GroupContributorsFormComponent {
  contributorForm: UntypedFormGroup;
  addYourselfForm: UntypedFormGroup;
  validationErrors: string[] = [];
  @Input() group: any;
  contributors: any;
  nr: number;
  user: User;
  alreadyAdded: boolean;
  edit: boolean;

  constructor(private fb: UntypedFormBuilder, private toastr: ToastrService, private toDoListServ: ToDoListService,
    private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.initializeForm();
    this.getGroupContributors(this.group?.id);
  }

  initializeForm() {
    this.addYourselfForm = this.fb.group({
      username: [this.user.username, []],
      email: [this.user.email, []],
      groupId: [this.group?.id]
    }),
    this.contributorForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$')]],
      groupId: [this.group?.id]
    })
  }

  addContributor(form: any) {
    this.toDoListServ.addContributor(form).subscribe(response => {
      this.toastr.success('Pomyślnie dodano wydatek');
      this.contributorForm.reset();
      this.getGroupContributors(this.group?.id);
      this.initializeForm();
    }, error => {
      this.validationErrors = error;
    })
  }

  getGroupContributors(id: number) {
    this.toDoListServ.getGroupContributors(id).subscribe(contributors => {
      this.contributors = contributors;
      for (let contributor of this.contributors) {
        if (contributor.username === this.user.username) {
          this.alreadyAdded = true;
        }
      }
    })
  }


}

