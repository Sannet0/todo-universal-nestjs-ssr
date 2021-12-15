import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ITask } from '../interface/task-interface';
import { IList } from '../interface/list-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpService) { }

  loadAllTasks(listId: number): Observable<ITask[]> {
    return this.httpService.get(`list/${listId}/tasks`);
  }

  addNewTask(text: string, listId: number): Observable<ITask> {
    return this.httpService.post('task', { text, listId });
  }

  deleteTask(id: number): Observable<number> {
    return this.httpService.delete(`task/${id}`);
  }

  changeTaskStatus(id: number, isCompleted: boolean): Observable<number> {
    return this.httpService.patch(`task/${id}`, { isCompleted });
  }

  completeAllTasks(listId: number): Observable<number> {
    return this.httpService.patch(`list/${listId}/tasks/all`);
  }

  deleteCompleteTasks(listId: number): Observable<number> {
    return this.httpService.delete(`list/${listId}/tasks/complete`);
  }

  login(login: string, password: string): Observable<{ jwt: string; rt: string }> {
    return this.httpService.post('user/login', { login, password });
  }

  registration(login: string, password: string, repPassword: string): Observable<{ jwt: string; rt: string }> {
    return this.httpService.post('user/registration', { login, password, repPassword });
  }

  loadAllLists(): Observable<IList[]> {
    return this.httpService.get('list');
  }

  addNewList(title: string): Observable<IList> {
    return this.httpService.post('list', { title });
  }

  authWithRefToken(token: string): Observable<{ jwt: string; rt: string }> {
    return this.httpService.patch('token', { token });
  }
}
