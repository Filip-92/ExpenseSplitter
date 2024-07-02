import { Component, OnInit, ElementRef, ViewChild, HostListener, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { NavComponent } from '../nav/nav.component';
import { trigger, state, style, transition, animate, group } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  @ViewChild('previewimage') waterMarkImage: ElementRef;
  @ViewChild("navComponent") navComponent: NavComponent;
  registerMode = false;
  display: boolean;
  innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  openNav() {
    this.display = !this.display;
    this.playAudioAccessDenied();
  }

  playAudioAccessDenied (){
    let audio = new Audio();
    audio.src = "../../../assets/audio/access-denied.mp3";
    audio.load();
    audio.play();
  }
}
