import { createAction, props } from '@ngrx/store';
import { ITask } from '../../interface/task-interface';

export const loadTasks = createAction(
  '[Tasks] Load tasks'
);

export const loadTasksSuccess = createAction(
  '[Tasks] Load tasks successfully',
  props<{ tasks: ITask[] }>()
);

export const addTask = createAction(
  '[Tasks] Add task',
  props<{ text: string }>()
);

export const addTaskSuccess = createAction(
  '[Tasks] Add task successfully',
  props<{ task: ITask }>()
);

export const changeTaskStatus = createAction(
  '[Tasks] Change task status',
  props<{ id: number; isCompleted: boolean }>()
);

export const changeTaskStatusSuccess = createAction(
  '[Tasks] Change task status successfully',
  props<{ id: number; isCompleted: boolean }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete task',
  props<{ id: number }>()
);

export const deleteTaskSuccess = createAction(
  '[Tasks] Delete task successfully',
  props<{ id: number }>()
);

export const selectAllTask = createAction(
  '[Tasks] Select all task'
);

export const selectAllTaskSuccess = createAction(
  '[Tasks] Select all task successfully'
);

export const deleteCompletedTask = createAction(
  '[Tasks] Delete all completed task'
);

export const deleteCompletedTaskSuccess = createAction(
  '[Tasks] Delete all completed task successfully'
);
