import { createAction, props } from '@ngrx/store';
import { IList } from '../../interface/list-interface';

export const loadLists = createAction(
  '[List] Load lists'
);

export const loadListsSuccess = createAction(
  '[List] Load lists success',
  props<{ lists: IList[] }>()
)

export const addList = createAction(
  '[List] Add list',
  props<{ title: string }>()
);

export const addListSuccess = createAction(
  '[List] Add list success',
  props<{ list: IList }>()
);
