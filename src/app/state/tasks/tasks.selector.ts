import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITasksState } from './tasks.model';

export const state = createFeatureSelector<ITasksState>('tasks');

export const tasks = createSelector(state, (state) => state.tasks);

export const tasksCount = createSelector(state, (state) => state.tasks.length);

export const tasksLeftCount = createSelector(state, (state) => state.tasks.length - state.tasks.filter(task => task.isCompleted).length);
