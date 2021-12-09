import { createReducer, on } from '@ngrx/store';
import {
  loadTasksSuccess,
  addTaskSuccess,
  changeTaskStatusSuccess,
  deleteTaskSuccess,
  deleteCompletedTaskSuccess,
  selectAllTaskSuccess
} from './tasks.actions';
import { initialState } from './tasks.model';

export const tasksStateKey = 'tasks';

export const tasksReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, {tasks}) => {
    return {
      ...state,
      tasks
    };
  }),
  on(addTaskSuccess, (state, {task}) => {
    const newTasks = [...state.tasks, task];
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(changeTaskStatusSuccess, (state, {id, isCompleted}) => {
    const newTasks = state.tasks.map((task) => task.id === id ? {...task, isCompleted} : task);
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(deleteTaskSuccess, (state, {id}) => {
    const newTasks = state.tasks.filter((task) => task.id !== id);
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(selectAllTaskSuccess, (state) => {
    const newTasks = state.tasks.map((task) => {
      return {...task, isCompleted: true};
    });
    return {
      ...state,
      tasks: newTasks
    };
  }),
  on(deleteCompletedTaskSuccess, (state) => {
    const newTasks = state.tasks.filter((task) => !task.isCompleted);
    return {
      ...state,
      tasks: newTasks
    };
  })
);
