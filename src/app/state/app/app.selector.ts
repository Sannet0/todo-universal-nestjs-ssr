import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from './app.model';

export const state = createFeatureSelector<IAppState>('app');

export const isDataLoad = createSelector(state, (state) => state.isDataLoad);
