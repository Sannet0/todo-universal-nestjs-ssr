import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Task } from '../entitys/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

  async createTask(task: {text: string; listId: number; userId: number;}): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async deleteTask(task: { id: number; }): Promise<DeleteResult> {
    return await this.taskRepository.delete([task.id]);
  }

  async setTaskStatus(id: number, isCompleted: boolean): Promise<UpdateResult> {
    return await this.taskRepository.update([id], { isCompleted });
  }

}
