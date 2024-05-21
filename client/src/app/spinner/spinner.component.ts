import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  public innerWidth: any;
  isMobile: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  
  constructor() { }

  size: string;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

}
