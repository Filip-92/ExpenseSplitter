import { Component } from "@angular/core";
import { DarkModeService } from "angular-dark-mode";
import { Observable } from "rxjs";

@Component({
    selector: 'app-dark-mode-toggle',
    template: `<div *ngIf="!darkMode">Light mode <i class="fa fa-sun-o mr-3" (click)="onToggle()"></i></div>
    <div *ngIf="darkMode">Dark mode <i class="fa fa-moon-o mr-3" (click)="onToggle()"></i></div>`,
  })
  export class DarkModeToggle {
    darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
    darkMode: boolean = true;
  
    constructor(private darkModeService: DarkModeService) {}
  
    onToggle(): void {
      this.darkModeService.toggle();
      this.darkMode = !this.darkMode;
    }
  }