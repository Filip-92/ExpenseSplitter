import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  addToDoListTask(model: any) {
    return this.http.post(this.baseUrl + 'toDoList/add-to-do-list-task', model);
  }

  getToDoListTasks() {
    return this.http.get<any>(this.baseUrl + 'users/get-to-do-list');
  }

  getDailyToDoListTasks() {
    return this.http.get<any>(this.baseUrl + 'users/get-daily-to-do-list', {});
  }

  getDailyGroupToDoListTasks(groupId: number) {
    return this.http.get<any>(this.baseUrl + 'users/get-daily-group-to-do-list/' + groupId, {});
  }

  filterTasks(from: any, to: any) {
    return this.http.get<any>(this.baseUrl + 'users/get-tasks-filter/' + from.replace('T', ' ') + '/' + to.replace('T', ' '), {});
  }

  filterGroupTasks(from: any, to: any, id: number) {
    return this.http.get<any>(this.baseUrl + 'users/get-group-tasks-filter/' + from.replace('T', ' ') + '/' + to.replace('T', ' ') + '/' + id, {});
  }

  removeTask(taskId: number) {
    return this.http.post(this.baseUrl + 'toDoList/remove-task/' + taskId, {});
  }

  updateTask(task: any) {
    return this.http.put(this.baseUrl + 'toDoList/update-task/' + task.id, task, {});
  }

  closeTask(task: any) {
    return this.http.put(this.baseUrl + 'toDoList/close-task/' + task.id, {});
  }

  addGroup(model: any) {
    return this.http.post(this.baseUrl + 'toDoList/add-group', model);
  }

  getGroups() {
    return this.http.get<any>(this.baseUrl + 'users/get-groups');
  }

  getGroup(id: number) {
    return this.http.get<any>(this.baseUrl + 'toDoList/display-group/' + id);
  }

  removeGroup(groupId: number) {
    return this.http.post(this.baseUrl + 'toDoList/remove-group/' + groupId, {});
  }

  updateGroup(group: any) {
    return this.http.put(this.baseUrl + 'toDoList/update-group/' + group.id, group, {});
  }

  addContributor(model: any) {
    return this.http.post(this.baseUrl + 'toDoList/add-contributor', model);
  }

  getGroupContributors(groupId: number) {
    return this.http.get<any>(this.baseUrl + 'users/get-group-contributors/' + groupId, {});
  }

  removeContributor(contributorId: number) {
    return this.http.post(this.baseUrl + 'toDoList/remove-contributor/' + contributorId, {});
  }

  updateContributor(contributor: any) {
    return this.http.put(this.baseUrl + 'toDoList/update-contributor/' + contributor.id, contributor, {});
  }

  getToDoListGroupTasks(groupId: number) {
    return this.http.get<any>(this.baseUrl + 'users/get-to-do-list-group-tasks/' + groupId, {});
  }

  addComment(model: any, taskId: number) {
    return this.http.post(this.baseUrl + 'toDoList/add-comment/' + taskId, model);
  }

  getTaskComments(taskId: number) {
    return this.http.get<any>(this.baseUrl + 'toDoList/get-comments/' + taskId, {});
  }

  getUserComments(username: string) {
    return this.http.get<any>(this.baseUrl + 'toDoList/get-user-comments/' + username, {});
  }

  getGroupByTaskId(taskId: number) {
    return this.http.get<any>(this.baseUrl + 'toDoList/get-group-by-taskId/' + taskId, {});
  }
  
  checkIfUserInContributors(groupId: number) {
    return this.http.get<any>(this.baseUrl + 'toDoList/check-if-user-in-contributors/' + groupId, {});
  }
}
