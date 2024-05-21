import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BanModalComponent } from 'src/app/modals/ban-modal/ban-modal.component';
import { RemoveUserComponent } from 'src/app/modals/remove-user/remove-user.component';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-roles-card',
  templateUrl: './user-roles-card.component.html',
  styleUrls: ['./user-roles-card.component.css']
})
export class UserRolesCardComponent implements OnInit {
  @Input() member: Member;
  bsModalRef: BsModalRef;
  user: any;

  constructor(private adminService: AdminService, private toastr: ToastrService,
    private modalServ: NgbModal, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUserWithRoles();
  }

  getUserWithRoles() {
    this.adminService.getUserWithRoles(this.member?.username).subscribe(user => {
      this.user = user;
    })
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
      const rolesToUpdate = {
        roles: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user?.username, rolesToUpdate?.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles]
        })
      }
    })
  }

  private getRolesArray(user) {
    const roles = [];
    const userRoles = user?.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'}
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role?.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    })
    return roles;
  }

  openRemoveUserModal(username: string) {
    const modalRef = this.modalServ?.open(RemoveUserComponent);
    modalRef.componentInstance.username = username;
    modalRef.componentInstance.modalRef = modalRef;
  }

  openBanModal(username: string) {
    const modalRef = this.modalServ?.open(BanModalComponent);
    modalRef.componentInstance.username = username;
    modalRef.componentInstance.modalRef = modalRef;
  }

  unbanUser(username: string) {
    this.adminService.unbanUser(username).subscribe(() => {
      this.toastr.success('Pomyślnie zdjęto bana z użytkownika ' + username);
    })
  }

}
