import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';;
import { Announcement } from 'src/app/_models/announcement';
import { ContactFormMessages } from 'src/app/_models/contactFormMessages';
import { Division } from 'src/app/_models/division';
import { AdminService } from 'src/app/_services/admin.service';
import { MemeService } from 'src/app/_services/meme.service';

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

  constructor(private adminService: AdminService, private memeService: MemeService, 
    private fb: UntypedFormBuilder, private toastr: ToastrService, private modalServ: NgbModal) { }

  ngOnInit(): void {
    this.getContactFormMessages();
    this.getDivisions();
    this.initializeForm();
    this.getAnnouncement();
    this.getMemeTags();
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

  getDivisions() {
    this.memeService.getDivisions().subscribe(divisions => {
      this.divisions = divisions;
    });
  }

  addDivision() {
    if (this.divisionForm.value.isCloseDivision === '0') {
      this.divisionForm.value.isCloseDivision = false;
    } else {
      this.divisionForm.value.isCloseDivision = true;
    }
    this.adminService.addDivision(this.divisionForm.value).subscribe(response => {
      this.toastr.success('Pomyślnie dodano dział');
      this.divisionForm.reset();
      this.getDivisions();
      }, error => {
      this.validationErrors = error;
    })
  }

  getAnnouncement() {
    this.memeService.getAnnouncement().subscribe(announcement => {
      this.announcement = announcement;
    })
  }

  addAnnouncement() {
    this.adminService.addAnnouncement(this.announcementForm.value).subscribe(response => {
      this.toastr.success('Pomyślnie dodano ogłoszenie');
      this.announcementForm.reset();
      this.getAnnouncement();
    }, error => {
      this.validationErrors = error;
    })
  }

  removeMessage(messageId: number) {
    this.adminService.removeMessage(messageId).subscribe(() => {
      this.messages.splice(this.messages.findIndex(p => p.id === messageId), 1);
    })
  }

  removeDivision(divisionId: number) {
    this.adminService.removeDivision(divisionId).subscribe(() => {
      this.divisions.splice(this.divisions.findIndex(p => p.id === divisionId), 1);
    })
    this.getDivisions();
  }

  removeAnnouncement(announcementId: number) {
    this.adminService.removeAnnouncement(announcementId).subscribe(() => {
      this.announcement.splice(this.announcement.findIndex(p => p.id === announcementId), 1);
    })
  }

  addMemeTag() {
    this.adminService.addMemeTag(this.memeTagForm.value).subscribe(response => {
      this.toastr.success('Pomyślnie dodano taga');
      this.memeTagForm.reset();
      this.getMemeTags();
    }, error => {
      this.validationErrors = error;
    })
  }

  getMemeTags() {
    this.memeService.getMemeTags().subscribe(memeTag => {
      this.memeTag = memeTag;
    })
  }

  // openDivisionNameUpdateModal(division: any) {
  //   const modalRef = this.modalServ.open(DivisionEditModalComponent);
  //   modalRef.componentInstance.division = division;
  //   modalRef.componentInstance.modalRef = modalRef;
  // }

}
