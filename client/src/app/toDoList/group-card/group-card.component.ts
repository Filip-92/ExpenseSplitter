import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';
import { ToDoListService } from '../../_services/to-do-list.service';
import { GroupTasksComponent } from '../group-tasks/group-tasks.component';
import { GroupEditModalComponent } from '../../modals/group-edit-modal/group-edit-modal.component';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent {
  @Input() group: any;
  more: boolean;

  constructor(public accountService: AccountService, private fb: UntypedFormBuilder, private toDoListServ: ToDoListService,
    private datePipe: DatePipe, private groupTasksComp: GroupTasksComponent, private modalServ: NgbModal) { 

    }

  showMore() {
    this.more = !this.more;
  }

  removeGroup(groupId: number) {
    this.toDoListServ.removeGroup(groupId).subscribe(() => {
      this.groupTasksComp.groups.splice(this.groupTasksComp.groups.findIndex(p => p.id === groupId), 1);
    })
    this.groupTasksComp.getGroups();
  }

  openGroupNameUpdateModal(group: any) {
    const modalRef = this.modalServ.open(GroupEditModalComponent);
    modalRef.componentInstance.group = group;
    modalRef.componentInstance.modalRef = modalRef;
  }

  convertText(title: string) {
    var result = title?.toLowerCase().split(' ').join('-').normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/%c5%82/g, "l").replace(/%C5%82/g, "l").
                replace(/ł/g, "l").replace('"', '').replace("/", "");
    result = this.removeSpecialChars(result);
    return result;
  }

  removeSpecialChars(title: string) {
    var specialChars = "/[!@#$%^&*()_+=[]{};':|,.<>?];"
    for (var special of specialChars) {
      title = title?.split(special).join('');
    }
    title = title?.replace("/", "").replace(/=/g, "").replace(String.fromCharCode(92), "").trim();
    return title;
  }

}
