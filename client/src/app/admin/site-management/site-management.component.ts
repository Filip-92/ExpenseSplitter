import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';;
import { Announcement } from 'src/app/_models/announcement';
import { ContactFormMessages } from 'src/app/_models/contactFormMessages';
import { Division } from 'src/app/_models/division';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-site-management',
  templateUrl: './site-management.component.html',
  styleUrls: ['./site-management.component.css']
})
export class SiteManagementComponent implements OnInit {
  messages: ContactFormMessages[];
  divisions: Division[];
  announcement: any;
  memeTag: any;
  divisionForm: UntypedFormGroup;
  announcementForm: UntypedFormGroup;
  memeTagForm: UntypedFormGroup;
  validationErrors: string[] = [];
  scrolltop: number=null;

  constructor(private adminService: AdminService, private fb: UntypedFormBuilder, private toastr: ToastrService, private modalServ: NgbModal) { }

  ngOnInit(): void {
    this.getContactFormMessages();
    this.initializeForm();
  }

  getSubject(id: number) {
    if(id.toString() === '1') {
      return "Feedback";
    } else if (id.toString() === '2') {
      return "Zgłoś błąd";
    } else if (id.toString() === '3') {
      return "Propozycje usprawnień";
    } else if (id.toString() === '4') {
      return "Zgłoś użytkownika";
    } else {
      return "Inny problem"
    }
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
    this.memeTagForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  removeMessage(messageId: number) {
    this.adminService.removeMessage(messageId).subscribe(() => {
      this.messages.splice(this.messages.findIndex(p => p.id === messageId), 1);
    })
  }

  removeAnnouncement(announcementId: number) {
    this.adminService.removeAnnouncement(announcementId).subscribe(() => {
      this.announcement.splice(this.announcement.findIndex(p => p.id === announcementId), 1);
    })
  }

}
