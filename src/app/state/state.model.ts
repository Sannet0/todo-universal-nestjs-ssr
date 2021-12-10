import { ActionReducerMap } from '@ngrx/store';
import { tasksReducer, tasksStateKey } from './tasks/tasks.reducer';
import { ITasksState } from './tasks/tasks.model';
import { appReducer, appStateKey } from './app/app.reduser';
import { IAppState } from './app/app.model';
import { listsReducer, listsStateKey } from './lists/list.reduser';
import { IListState } from './lists/list.module';

export interface IState {
  [listsStateKey]: IListState;
  [tasksStateKey]: ITasksState;
  [appStateKey]: IAppState;
}

export const reducers: ActionReducerMap<IState> = {
  lists: listsReducer,
  tasks: tasksReducer,
  app: appReducer,
};
