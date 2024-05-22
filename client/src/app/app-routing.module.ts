import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { NoInternetComponent } from './errors/no-internet/no-internet.component'
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './_guards/admin.guard';
import { AboutComponent } from './about/about.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ExpensesComponent } from './expenses/expenses.component'
import { ToDoListComponent } from './toDoList/to-do-list/to-do-list.component';
import { GroupTaskCardComponent } from './toDoList/group-task-card/group-task-card.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'expenses', component: ExpensesComponent},
      {path: 'to-do-list', component: ToDoListComponent},
      {path: 'to-do-list/:id/:groupName', component: GroupTaskCardComponent},
      {path: 'uzytkownicy', component: MemberListComponent},
      {path: 'uzytkownicy/:username', component: MemberDetailComponent, resolve: {member: MemberDetailedResolver}},
      {path: 'uzytkownik/edycja', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'wiadomosci', component: MessagesComponent},
      {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
      {path: 'reset-password', component: ResetPasswordComponent },
      {path: 'about', component: AboutComponent},
      {path: 'zapomnialem-hasla', component: ForgotPasswordComponent, canActivate: [AuthGuard], data: { requiresLogin: false } },
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'no-internet', component: NoInternetComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent },
  {path: 'about', component: AboutComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }