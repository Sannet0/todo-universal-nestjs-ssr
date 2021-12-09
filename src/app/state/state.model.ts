import { ActionReducerMap } from '@ngrx/store';
import { tasksReducer, tasksStateKey } from './tasks/tasks.reducer';
import { ITasksState } from './tasks/tasks.model';
import { appReducer, appStateKey } from './app/app.reduser';
import { IAppState } from './app/app.model';

export interface IState {
  [tasksStateKey]: ITasksState;
  [appStateKey]: IAppState;
}

export const reducers: ActionReducerMap<IState> = {
  tasks: tasksReducer,
  app: appReducer
};
