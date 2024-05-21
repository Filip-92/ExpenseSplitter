import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.css']
})
export class NoInternetComponent {

  constructor(private router: Router) {
    
  }

  goToMain(): void {
    this.router.navigateByUrl('/');
  }

}
