import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { MembersService } from 'src/app/_services/members.service';
import { Photo } from 'src/app/_models/photo';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ExpensesService } from '../../_services/expenses.service';
import { Category } from '../../_models/category';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() category: Category;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
  previewImg: SafeUrl;

  constructor(private accountService: AccountService, private memberService: MembersService, private sanitizer: DomSanitizer,
    private expensesService: ExpensesService
  ) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
    if (this.category?.photos?.length > 0) {
      this.deletePhotos();
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    // this.expensesService.setCategoryPhoto(photo.id).subscribe(() => {
    //   this.user.photoUrl = photo.url;
    //   this.accountService.setCurrentUser(this.user);
    //   this.category.photoUrl = photo.url;
    //   this.category?.photos.forEach(p => {
    //     if (p.isMain) p.isMain = false;
    //     if (p.id === photo.id) p.isMain = true;
    //   })
    // })
  } 

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
      url: this.baseUrl + 'users/add-photo',
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
        this.setMainPhoto(photo);
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