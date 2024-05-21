import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  //@Input() messages: Message[];
  @Input() username: string;
  messageContent: string;
  loading = false;
  editToggle : boolean;
  message: any;
  messages: any;
  // messages: Message[];
  // editForm: FormGroup;

  constructor(public messageService: MessageService, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.getMessages(this.username);
  }

  sendMessage() {
    if (!this.username) return;
    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next: message => {
        this.messages?.push(message);
        this.messageForm?.reset();
        //this.getMessages(this.username);
      }
    })
  }

  getMessages(username: string) {
    this.messageService.getMessages(username).subscribe(messages => {
      this.messages = messages;
      console.log(this.messages);
    });
  }

  editMessage(id: number) {
    this.editToggle = !this.editToggle;
    //this.initializeEditForm();
  }

  updateMessage() {
    this.messageService.updateMessage(this.message).subscribe(() => {
      this.editForm.reset(this.editForm.value);
      this.editToggle = !this.editToggle;
    })
  }

}