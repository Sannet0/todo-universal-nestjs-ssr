import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ITask } from '../interface/task-interface';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  addTask,
  changeTaskStatus,
  deleteCompletedTask,
  deleteTask,
  loadTasks,
  selectAllTask
} from '../state/tasks/tasks.actions';
import { tasks, tasksCount, tasksLeftCount } from '../state/tasks/tasks.selector';

export enum FilterType {
  all,
  completed,
  active
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private store: Store<{ tasks: ITask[] }>) {
  }

  private filterType$ = new BehaviorSubject<FilterType>(FilterType.all);
  tasks$ = this.store.select(tasks);
  taskCount$ = this.store.select(tasksCount);
  tasksLeftCount$ = this.store.select(tasksLeftCount);
  filteredTasks$ = combineLatest(
    this.tasks$,
    this.filterType$
  ).pipe(
    map(([tasks, filterType]) => tasks.filter((task: ITask) => {
      return this.filterTasksExpression(task, filterType);
    }))
  );


  loadAllTasks(listId: number): void {
    this.store.dispatch(loadTasks({ listId }));
  }

  addNewTask(text: string, listId: number): void {
    this.store.dispatch(addTask({ text, listId }));
  }

  changeTaskStatus(id: number, isCompleted: boolean): void {
    this.store.dispatch(changeTaskStatus({ id, isCompleted }));
  }

  deleteTask(id: number): void {
    this.store.dispatch(deleteTask({ id }));
  }

  selectAllTask(listId: number): void {
    this.store.dispatch(selectAllTask({ listId }));
  }

  deleteCompletedTasks(listId: number): void {
    this.store.dispatch(deleteCompletedTask({ listId }));
  }

  setFilterTasksType(type: FilterType): void {
    this.filterType$.next(type);
  }

  private filterTasksExpression(task: ITask, type: FilterType): boolean {
    if (type === FilterType.all) {
      return true;
    }
    if (type === FilterType.completed && task.isCompleted) {
      return true;
    }
    return type === FilterType.active && !task.isCompleted;
  }
}
