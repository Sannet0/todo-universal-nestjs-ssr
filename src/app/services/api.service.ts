import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ITask } from '../interface/task-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpService) { }

  loadAllTasks(): Observable<ITask[]> {
    return this.httpService.get('tasks');
  }

  addNewTask(text: string): Observable<ITask> {
    return this.httpService.post('task', { text });
  }

  deleteTask(id: number): Observable<number> {
    return this.httpService.delete(`task/${id}`);
  }

  changeTaskStatus(id: number, isCompleted: boolean): Observable<number> {
    return this.httpService.patch(`task/${id}`, { isCompleted });
  }

  completeAllTasks(): Observable<number> {
    return this.httpService.patch(`tasks/all`);
  }

  deleteCompleteTasks(): Observable<number> {
    return this.httpService.delete('tasks/complete');
  }
}
