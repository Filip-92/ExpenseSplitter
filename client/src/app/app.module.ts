import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmPasswordSentComponent } from './confirm-password-sent/confirm-password-sent.component';
import { ConnectionService } from './_services/connection.service';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { AboutModalComponent } from './modals/about-modal/about-modal.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AuthenticationService } from './_services/authentication.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './_guards/auth.guard';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { TimeagoModule, TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter } from 'ngx-timeago';
import { DatePipe, registerLocaleData } from '@angular/common';
import { MemeTitleInputComponent } from './_forms/meme-title-input/meme-title-input.component';
import { IsMobileDirective } from './_directives/is-mobile.directive';
import { NgxLinkPreviewModule } from 'ngx-link-preview';
import localePl from '@angular/common/locales/global/pl';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BanModalComponent } from './modals/ban-modal/ban-modal.component';
import { UserCardComponent } from './admin/user-card/user-card.component';
import { SiteManagementComponent } from './admin/site-management/site-management.component';
import { NotificationsModalComponent } from './modals/notifications-modal/notifications-modal.component';
import { ChangePasswordComponent } from './members/change-password/change-password.component';
import { MessageComponent } from './members/message/message.component';
import { RemoveUserComponent } from './modals/remove-user/remove-user.component';
import { RemoveAccountComponent } from './modals/remove-account/remove-account.component';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastrService } from 'ngx-toastr';
import {
  NbThemeModule,
  NbLayoutModule,
  NbButtonModule
} from '@nebular/theme';
import { SpinnerComponent } from './spinner/spinner.component';
import { CategoryEditModalComponent } from './modals/category-edit-modal/category-edit-modal.component';
import { UserRolesCardComponent } from './admin/user-roles-card/user-roles-card.component';
import { MemeThumbnailComponent } from './modals/notifications-modal/meme-thumbnail/meme-thumbnail.component';
import { NoInternetComponent } from './errors/no-internet/no-internet.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { DarkModeToggle } from './dark-mode/dark-mode-toggle.component';
import { ExpenseFormComponent } from './expenses/expense-form/expense-form.component';
import { ContributorsFormComponent } from './expenses/contributors-form/contributors-form.component';
import { ExpenseColumnComponent } from './expenses/expense-column/expense-column.component';
import { TableComponent } from './expenses/table/table.component';
import { SpendingsModalComponent } from './modals/spendings-modal/spendings-modal.component';
import { EditSpendingsModalComponent } from './modals/edit-spendings-modal/edit-spendings-modal.component';
import { TableButtonComponent } from './expenses/table-button/table-button.component';
import { ExpenseCardComponent } from './expenses/expense-card/expense-card.component';
import { SummaryCardComponent } from './expenses/summary-card/summary-card.component';
import { SummaricalExpensesComponent } from './expenses/summarical-expenses/summarical-expenses.component';
import { DebtCardComponent } from './expenses/debt-card/debt-card.component';
import { AddCategoryPhotoComponent } from './modals/add-category-photo/add-category-photo.component';
import { ToDoListComponent } from './toDoList/to-do-list/to-do-list.component';
import '@angular/common/locales/global/pl';
import { TaskCardComponent } from './toDoList/task-card/task-card.component';
import { EditTaskModalComponent } from './modals/edit-task-modal/edit-task-modal.component';
import { IndividualTasksComponent } from './toDoList/individual-tasks/individual-tasks.component';
import { GroupTasksComponent } from './toDoList/group-tasks/group-tasks.component';
import { GroupContributorsFormComponent } from './toDoList/group-contributors-form/group-contributors-form.component';
import { GroupContributorCardComponent } from './toDoList/group-contributor-card/group-contributor-card.component';
import { GroupTaskCardComponent } from './toDoList/group-task-card/group-task-card.component';
import { GroupEditModalComponent } from './modals/group-edit-modal/group-edit-modal.component';
import { CategoryCardComponent } from './expenses/category-card/category-card.component';
import { GroupCardComponent } from './toDoList/group-card/group-card.component';
import { GroupTaskCardFormComponent } from './toDoList/task-card-form/task-card-form.component';
import { TasksListCardComponent } from './toDoList/tasks-list-card/tasks-list-card.component';
import { GroupTasksFilterComponent } from './toDoList/group-tasks-filter/group-tasks-filter.component';
import { CommentsComponent } from './toDoList/comments/comments.component';
import { ContributorUpdateComponent } from './expenses/contributor-update/contributor-update.component';
import { UserPhotoComponent } from './user-photo/user-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    RolesModalComponent,
    ConfirmDialogComponent,
    ConfirmPasswordSentComponent,
    FooterComponent,
    AboutComponent,
    AboutModalComponent,
    ContactFormComponent,
    ResetPasswordComponent,
    MemeTitleInputComponent,
    IsMobileDirective,
    BanModalComponent,
    UserCardComponent,
    SiteManagementComponent,
    NotificationsModalComponent,
    ChangePasswordComponent,
    MessageComponent,
    RemoveUserComponent,
    RemoveAccountComponent,
    SpinnerComponent,
    CategoryEditModalComponent,
    UserRolesCardComponent,
    MemeThumbnailComponent,
    NoInternetComponent,
    ExpensesComponent,
    DarkModeToggle,
    ExpenseFormComponent,
    ContributorsFormComponent,
    ExpenseColumnComponent,
    TableComponent,
    SpendingsModalComponent,
    EditSpendingsModalComponent,
    TableButtonComponent,
    ExpenseCardComponent,
    SummaryCardComponent,
    SummaricalExpensesComponent,
    DebtCardComponent,
    AddCategoryPhotoComponent,
    ToDoListComponent,
    TaskCardComponent,
    EditTaskModalComponent,
    IndividualTasksComponent,
    GroupTasksComponent,
    GroupContributorsFormComponent,
    GroupContributorCardComponent,
    GroupTaskCardComponent,
    GroupEditModalComponent,
    CategoryCardComponent,
    GroupCardComponent,
    GroupTaskCardFormComponent,
    TasksListCardComponent,
    GroupTasksFilterComponent,
    CommentsComponent,
    ContributorUpdateComponent,
    UserPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    NgbModule,
    NgxLinkPreviewModule,
    ImageCropperModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ShareButtonsModule,
    ShareIconsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    TimeagoModule.forRoot({formatter: { provide: 
      TimeagoFormatter, useClass: TimeagoCustomFormatter },}),
    RouterModule.forRoot([
      { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() { 
        return localStorage.getItem('token');
        } 
     }
   }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: NavComponent, useClass: NavComponent, multi: true},
    {provide: IndividualTasksComponent, useClass: IndividualTasksComponent, multi: true},
    {provide: GroupTaskCardComponent, useClass: GroupTaskCardComponent, multi: true},
    {provide: ExpenseFormComponent, useClass: ExpenseFormComponent, multi: true},
    {provide: TableComponent, useClass: TableComponent, multi: true},
    {provide: SpendingsModalComponent, useClass: SpendingsModalComponent, multi: true},
    {provide: LOCALE_ID, useValue: "pl", useFactory: (sessionService) => sessionService.getLocale()},
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
    [TimeagoIntl],
    [DatePipe],
    AuthGuard,
    CookieService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }