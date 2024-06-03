import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ContactFormMessages } from '../_models/contactFormMessages';
import { PaginatedResult } from '../_models/pagination';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';
import { Division } from '../_models/division';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  divisions: any;
  paginatedResultMembers: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
  memberCache = new Map();

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles');
  }

  getMembersAdmin(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
  
      if (page !== null && itemsPerPage !== null) {
        params = params.append('pageNumber', page.toString());
        params = params.append('pageSize', itemsPerPage.toString());
      }
      return this.http.get<Member[]>(this.baseUrl + 'admin/get-users', {observe: 'response', params}).pipe(
        map(response => {
          this.paginatedResultMembers.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            this.paginatedResultMembers.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return this.paginatedResultMembers;
        })
      );
  }

  searchMembersAdmin(searchString: string, page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
  
      if (page !== null && itemsPerPage !== null) {
        params = params.append('pageNumber', page.toString());
        params = params.append('pageSize', itemsPerPage.toString());
      }
      return this.http.get<Member[]>(this.baseUrl + 'admin/search-users/' + searchString, {observe: 'response', params}).pipe(
        map(response => {
          this.paginatedResultMembers.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            this.paginatedResultMembers.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return this.paginatedResultMembers;
        })
      );
  }
  
  getUserWithRoles(username: string) {
    return this.http.get<User>(this.baseUrl + 'admin/get-user-with-roles/' + username);
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
  }


  searchForUser(searchString: string) {
    return this.http.get<Photo>(this.baseUrl + 'admin/search-users/' + searchString);
  }

  approveMeme(memeId: number) {
    return this.http.post(this.baseUrl + 'admin/approve-meme/' + memeId, {});
  }

  disapproveMeme(memeId: number) {
    return this.http.post(this.baseUrl + 'admin/disapprove-meme/' + memeId, {});
  }

  hideMeme(memeId: number) {
    return this.http.post(this.baseUrl + 'admin/hide-meme/' + memeId, {});
  }

  pushMemeToMain(memeId: number) {
    return this.http.post(this.baseUrl + 'admin/push-meme-to-main/' + memeId, {});
  }

  rejectMeme(memeId: number) {
    return this.http.post(this.baseUrl + 'admin/reject-meme/' + memeId, {});
  }

  removeMessage(messageId: number) {
    return this.http.post(this.baseUrl + 'admin/remove-message/' + messageId, {});
  }

  removeUser(username: string) {
    return this.http.post(this.baseUrl + 'admin/remove-user/' + username, {});
  }

  banUser(username: string, model: any, days: number) {
    return this.http.post(this.baseUrl + 'admin/ban-user/' + username + "/" + days, model);
  }

  unbanUser(username: string) {
    return this.http.post(this.baseUrl + 'admin/unban-user/' + username, {});
  }

  getUserPhoto(id: number) {
    return this.http.get<Photo>(this.baseUrl + 'memes/get-user-photo/' + id);
  }

  getContactFormMessages() {
    return this.http.get<ContactFormMessages[]>(this.baseUrl + 'admin/contact-form-messages', {});
  }

  addDivision(model: any) {
    return this.http.post(this.baseUrl + 'admin/add-division', model);
  }

  removeDivision(divisionId: number) {
    return this.http.post(this.baseUrl + 'admin/remove-division/' + divisionId, {});
  }

  getDivisionNameById(divisionId: number) {
    return this.http.get<Division>(this.baseUrl + 'memes/get-division-name-by-id/' + divisionId);
  }

  switchDivisions(model: any, memeId: number) {
    return this.http.put(this.baseUrl + 'admin/switch-divisions/' + memeId, model);
  }

  addAnnouncement(model: any) {
    return this.http.post(this.baseUrl + 'admin/add-announcement/', model);
  }

  removeAnnouncement(announcementId: number) {
    return this.http.post(this.baseUrl + 'admin/remove-announcement/' + announcementId, {});
  }

  addMemeTag(model: any) {
    return this.http.post(this.baseUrl + 'admin/add-meme-tag', model);
  }

  updateDivisionName(division: any) {
    return this.http.put(this.baseUrl + 'admin/update-division-name/' + division.id, division, {});
  }
}