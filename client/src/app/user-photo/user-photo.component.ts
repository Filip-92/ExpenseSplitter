import { Component, Input } from '@angular/core';
import { ExpensesService } from '../_services/expenses.service';
import { Photo } from '../_models/photo';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.css']
})
export class UserPhotoComponent {
  @Input() email: string;
  photo: any;

  constructor(public expensesServ: ExpensesService) { }

  ngOnInit(): void {
    this.getUserPhoto();
  }


  getUserPhoto() {
    this.expensesServ.getUserPhoto(this.email).subscribe(photo => {
      this.photo = photo;
    })
  }

}
