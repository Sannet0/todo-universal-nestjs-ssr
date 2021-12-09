import { createAction, props } from '@ngrx/store';

export const changeLoadStatus = createAction(
  '[App] Change load status',
  props<{ isDataLoad: boolean }>()
);
