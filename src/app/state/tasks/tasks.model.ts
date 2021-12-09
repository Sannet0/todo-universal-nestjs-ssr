import { ITask } from '../../interface/task-interface';

export interface ITasksState {
  tasks: ITask[];
}

export const initialState: ITasksState = {
  tasks: []
};
