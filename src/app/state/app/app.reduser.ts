import { createReducer, on } from '@ngrx/store';
import { changeLoadStatus } from './app.actions';
import { initialState } from './app.model';

export const appStateKey = 'app';

export const appReducer = createReducer(
  initialState,
  on(changeLoadStatus, (state, { isDataLoad }) => {
    return {
      ...state,
      isDataLoad
    };
  })
);
