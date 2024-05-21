import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { Category } from '../../_models/category';
import { ExpensesService } from '../../_services/expenses.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-add-category-photo',
  templateUrl: './add-category-photo.component.html',
  styleUrls: ['./add-category-photo.component.css']
})
export class AddCategoryPhotoComponent {
  @Input() category: Category;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User
  previewImg: SafeUrl;

  constructor(private accountService: AccountService, private expensesService: ExpensesService, private sanitizer: DomSanitizer) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);

  }

  ngOnInit(): void {
    this.initializeUploader();
    // if (this.member?.photos?.length > 0) {
    //   this.deletePhotos();
    // }
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  // setCategoryPhoto(photo: any) {
  //   this.expensesService.addCategoryPhoto(photo.id).subscribe(() => {
  //     // this.user.photoUrl = photo.url;
  //     // this.accountService.setCurrentUser(this.user);
  //     this.category.photoUrl = photo.url;
  //     // this.member?.photos.forEach(p => {
  //     //   if (p.isMain) p.isMain = false;
  //     //   if (p.id === photo.id) p.isMain = true;
  //     // })
  //   })
  // } 

  deletePhoto(photoId: number) {
    this.expensesService.deletePhoto(photoId).subscribe(() => {
      this.category.photos = this.category.photos.filter(x => x.id !== photoId);
    })
  }

  deletePhotos() {
    this.category.photos.forEach(p => {
        this.expensesService.deletePhoto(p.id).subscribe(() => {
          this.category.photos = this.category.photos.filter(x => x.id !== p.id);
        })
    })
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-category-photo/' + this.category.id,
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        this.deletePhotos();
        this.category.photos.forEach(p => {
          if (p.isMain) p.isMain = false;
          if (p.id === photo.id) p.isMain = true;
        })
        this.category.photos.push(photo);
        //this.setCategoryPhoto(photo);
         if (photo.isMain) {
           this.user.photoUrl = photo.url;
           this.category.photoUrl = photo.url;
           this.accountService.setCurrentUser(this.user);
         }
         this.previewImg = null; 
      }
    }

    this.uploader.onAfterAddingFile = (file) => {
      this.previewImg = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file._file)));;
    }
  }
}
