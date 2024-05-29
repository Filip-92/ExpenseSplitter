import { Component } from "@angular/core";
import { DarkModeService } from "angular-dark-mode";
import { Observable } from "rxjs";

@Component({
    selector: 'app-dark-mode-toggle',
    template: `<div *ngIf="!darkMode" id="modeToggle" (click)="onToggle()"><i class="fa fa-sun-o mr-2"></i>Tryb jasny</div>
    <div *ngIf="darkMode" id="modeToggle" (click)="onToggle()"><i class="fa fa-moon-o mr-2"></i>Tryb ciemny</div>`,
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