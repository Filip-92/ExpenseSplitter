import { Component } from "@angular/core";
import { DarkModeService } from "angular-dark-mode";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-dark-mode-toggle',
    template: `<div *ngIf="!darkMode" id="modeToggle" (click)="onToggle()"><i class="fa fa-sun-o mr-2"></i>Tryb jasny</div>
    <div *ngIf="darkMode" id="modeToggle" (click)="onToggle()"><i class="fa fa-moon-o mr-2"></i>Tryb ciemny</div>`,
  })
  export class DarkModeToggle {
    darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
    darkMode: boolean = true;
  
    constructor(private darkModeService: DarkModeService, private cookieService: CookieService) {}

    ngOnInit(): void {
      this.darkMode = true;
    }
  
    onToggle(): void {
      this.darkModeService.toggle();
      this.darkMode = !this.darkMode;
      if (this.darkMode) {
        this.setCookie(this.darkMode);
      } else {
        this.setCookie(!this.darkMode);
      }

    }

    setCookie(isDarkMode: boolean) {
      this.cookieService.set('darkMode', String(isDarkMode), 10);
    }


  }