import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './tasks.actions';
import * as AppActions from '../app/app.actions';
import { map, mergeMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasks),
    mergeMap(({ listId }) =>
      this.apiService.loadAllTasks(listId).pipe(
        mergeMap((tasks) => [
          TaskActions.loadTasksSuccess({ tasks }),
          AppActions.changeLoadStatus({ isDataLoad: true })
        ])
      )
    )
  ));

  newTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.addTask),
    mergeMap(({ text, listId }) =>
      this.apiService.addNewTask(text, listId).pipe(
        map(task => TaskActions.addTaskSuccess({ task }))
      )
    )
  ));

  changeTaskStatus$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.changeTaskStatus),
    mergeMap(({ id, isCompleted }) =>
      this.apiService.changeTaskStatus(id, isCompleted).pipe(
        map(() => TaskActions.changeTaskStatusSuccess({ id, isCompleted }))
      )
    )
  ));

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.deleteTask),
    mergeMap(({ id }) =>
      this.apiService.deleteTask(id).pipe(
        map(() => TaskActions.deleteTaskSuccess({ id }))
      )
    )
  ));

  deleteCompleteTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.deleteCompletedTask),
    mergeMap(({ listId }) =>
      this.apiService.deleteCompleteTasks(listId).pipe(
        map(() => TaskActions.deleteCompletedTaskSuccess())
      )
    )
  ));

  completeAllTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.selectAllTask),
    mergeMap(({ listId }) =>
      this.apiService.completeAllTasks(listId).pipe(
        map(() => TaskActions.selectAllTaskSuccess())
      )
    )
  ));
}
