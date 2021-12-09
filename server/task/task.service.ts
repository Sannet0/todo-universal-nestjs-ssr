import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateTask } from '../interfaces/create-task-interface';
import { IChangeTask } from '../interfaces/change-task-interface';
import { ISetStatusTask } from '../interfaces/set-status-task-interface';
import { Repository } from 'typeorm';
import { Task } from '../entitys/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

  async createTask(task: ICreateTask) {
    return await this.taskRepository.save(task);
  }

  async deleteTask(task: IChangeTask) {
    const {id} = task;
    return await this.taskRepository.delete([id])
  }

  async setTaskStatus(task: ISetStatusTask) {
    const {isCompleted, id} = task;
    return await this.taskRepository.update([id], { isCompleted });
  }

}
