import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addToDoListTask(model: any) {
    return this.http.post(this.baseUrl + 'toDoList/add-to-do-list-task', model);
  }

  getToDoListTasks() {
    return this.http.get<any>(this.baseUrl + 'users/get-to-do-list');
  }

  filterTasks(from: any, to: any) {
    return this.http.get<any>(this.baseUrl + 'users/get-tasks-filter/' + from.replace('T', ' ') + '/' + to.replace('T', ' '), {});
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


  
}
