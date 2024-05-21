import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Announcement } from 'src/app/_models/announcement';
import { ContactFormMessages } from 'src/app/_models/contactFormMessages';
import { Division } from 'src/app/_models/division';
import { AdminService } from 'src/app/_services/admin.service';
import { ExpensesService } from 'src/app/_services/expenses.service';
import { CategoryEditModalComponent } from '../modals/category-edit-modal/category-edit-modal.component';
import { AddCategoryPhotoComponent } from '../modals/add-category-photo/add-category-photo.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {
  messages: ContactFormMessages[];
  divisions: Division[];
  categories: any;
  divisionForm: UntypedFormGroup;
  announcementForm: UntypedFormGroup;
  categoryForm: UntypedFormGroup;
  expensesForm: UntypedFormGroup;
  validationErrors: string[] = [];
  addNewCategory: boolean;
  scrolltop: number=null;
  active: boolean;

  constructor(private adminService: AdminService, private fb: UntypedFormBuilder, private toastr: ToastrService, 
  private modalServ: NgbModal, private expensesServ: ExpensesService) { }

  ngOnInit(): void {
    //this.getContactFormMessages();
    this.initializeForm();
    this.getCategories();
  }

  getContactFormMessages() {
    this.adminService.getContactFormMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

  initializeForm() {
    this.divisionForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      isCloseDivision: ['0', [Validators.required]]
    })
    this.announcementForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(200)]]
    })
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  // removeMessage(messageId: number) {
  //   this.adminService.removeMessage(messageId).subscribe(() => {
  //     this.messages.splice(this.messages.findIndex(p => p.id === messageId), 1);
  //   })
  // }

  addCategory() {
    this.expensesServ.addCategory(this.categoryForm.value).subscribe(response => {
      this.toastr.success('Pomyślnie dodano kategorię');
      this.categoryForm.reset();
      this.getCategories();
    }, error => {
      this.validationErrors = error;
    })
  }

  getCategories() {
    this.expensesServ.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  getClosedCategories() {
    this.expensesServ.getClosedCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  addNew() {
    this.addNewCategory = !this.addNewCategory;
  }

  changeTab() {
    this.active = !this.active;
    if (this.active === true) {
      this.getClosedCategories();
    } else {
      this.getCategories();
    }
  }
}
