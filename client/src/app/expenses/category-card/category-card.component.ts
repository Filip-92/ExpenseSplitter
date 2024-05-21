import { Component, Input } from '@angular/core';
import { Category } from '../../_models/category';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ExpensesService } from '../../_services/expenses.service';
import { AddCategoryPhotoComponent } from '../../modals/add-category-photo/add-category-photo.component';
import { CategoryEditModalComponent } from '../../modals/category-edit-modal/category-edit-modal.component';
import { ExpensesComponent } from '../expenses.component';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
  @Input() category: Category;
  more: boolean;

  constructor(private fb: UntypedFormBuilder, private toastr: ToastrService, 
    private modalServ: NgbModal, private expensesServ: ExpensesService, private expensesComp: ExpensesComponent) { }


  removeCategory(categoryId: number) {
    this.expensesServ.removeCategory(categoryId).subscribe(() => {
      this.expensesComp.categories.splice(this.expensesComp.categories.findIndex(p => p.id === categoryId), 1);
    })
    this.expensesComp.getCategories();
  }

  openCategoryNameUpdateModal(category: any) {
    const modalRef = this.modalServ.open(CategoryEditModalComponent);
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.modalRef = modalRef;
  }

  openCategoryPhotoModal(category: any) {
    const modalRef = this.modalServ.open(AddCategoryPhotoComponent);
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.modalRef = modalRef;
  }

  showMore() {
    this.more = !this.more;
  }

}