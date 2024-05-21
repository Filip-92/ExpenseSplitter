import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BanModalComponent } from 'src/app/modals/ban-modal/ban-modal.component';
import { RemoveUserComponent } from 'src/app/modals/remove-user/remove-user.component';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { Pagination } from 'src/app/_models/pagination';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any;
  bsModalRef: BsModalRef;
  banUserForm: UntypedFormGroup;
  validationErrors: string[] = [];
  photo: Photo;
  url: string;
  userSearchForm: UntypedFormGroup;
  pagination: Pagination;
  pageSize = 8;
  pageNumber = 0;
  totalItems: number = 0;
  members: any;
  userParams: UserParams;

  constructor(private adminService: AdminService, private modalService: BsModalService, 
    private modalServ: NgbModal, private toastr: ToastrService, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    // this.getUsersWithRoles();
    this.initializeUserForm();
    this.loadMembersAdmin();
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    })
  }

  loadMembersAdmin() {
    this.adminService.getMembersAdmin(this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  initializeUserForm() {
    this.userSearchForm= this.fb.group({
      searchString: ['']
    })
  }

  // searchForUser(searchString: string) {
  //   this.adminService.searchForUser(searchString.toLowerCase()).subscribe(response => {
  //     this.users = response;
  //   });
  // }

  searchForMembers(searchString: string) {
    this.adminService.searchMembersAdmin(searchString.toLowerCase(), this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.users.length = this.members?.length;
      this.pagination = response.pagination;
      this.totalItems = response.pagination.totalItems;
    });
  }

  getUserPhoto(id: number) {
    this.adminService.getUserPhoto(id).subscribe(photo => {
      if (photo.url !== null) {
        this.url = photo.url;
      } else {
        this.url = null;
      }
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    if (this.pageNumber === 1) {
      this.pageNumber = 0;
    }
    this.loadMembersAdmin();
  }

}