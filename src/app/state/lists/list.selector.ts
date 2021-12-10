import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IListState } from './list.module';

export const state = createFeatureSelector<IListState>('lists');

export const lists = createSelector(state, (state) => state.lists);
