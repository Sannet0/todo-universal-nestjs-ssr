import { createReducer, on } from '@ngrx/store';
import { initialState } from './list.module';
import {
  addListSuccess,
  loadListsSuccess
} from './list.actions';

export const listsStateKey  = 'lists';

export const listsReducer = createReducer(
  initialState,
  on(loadListsSuccess, (state, { lists }) => {
    return {
      ...state,
      lists
    }
  }),
  on(addListSuccess, (state, { list }) => {
    const newLists = [...state.lists, list];
    return {
      ...state,
      lists: newLists
    }
  })
)
