import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { ToDoListService } from '../../_services/to-do-list.service';
import { GroupEditModalComponent } from '../../modals/group-edit-modal/group-edit-modal.component';

@Component({
  selector: 'app-group-tasks',
  templateUrl: './group-tasks.component.html',
  styleUrls: ['./group-tasks.component.css']
})
export class GroupTasksComponent {
  addNewGroup: boolean;
  addGroupForm: UntypedFormGroup;
  validationErrors: string[] = [];
  groups: any;
  more: boolean;

  constructor(public accountService: AccountService, private toastr: ToastrService, 
    private fb: UntypedFormBuilder, private toDoListServ: ToDoListService) { 

    }

  ngOnInit(): void {
    this.initializeForm();
    this.getGroups();
  }

  initializeForm() {
    this.addGroupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  addNew() {
    this.addNewGroup = !this.addNewGroup;
  }

  addGroup() {
    this.toDoListServ.addGroup(this.addGroupForm.value).subscribe(response => {
      this.toastr.success('Pomyślnie dodano kategorię');
      this.addGroupForm.reset();
      this.getGroups();
    }, error => {
      this.validationErrors = error;
    })
  }

  getGroups() {
    this.toDoListServ.getGroups().subscribe(response => {
      this.groups = response;
    })
  }

  showMore() {
    this.more = !this.more;
  }

  removeGroup(groupId: number) {
    this.toDoListServ.removeGroup(groupId).subscribe(() => {
      this.groups.splice(this.groups.findIndex(p => p.id === groupId), 1);
    })
    this.getGroups();
  }



  // openCategoryPhotoModal(category: any) {
  //   const modalRef = this.modalServ.open(AddCategoryPhotoComponent);
  //   modalRef.componentInstance.category = category;
  //   modalRef.componentInstance.modalRef = modalRef;
  // }

}
