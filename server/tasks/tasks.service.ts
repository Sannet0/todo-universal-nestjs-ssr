import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entitys/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find({
      order: { id: 'ASC' },
    });
  }

  async deleteCompletedTask() {
    const completeTasks: Task[] = await this.taskRepository.find({ isCompleted: true });
    return this.taskRepository.remove(completeTasks);
  }

  async setAllComplete() {
    return await this.taskRepository.update({ isCompleted: false }, { isCompleted: true });
  }
}
