import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Task } from '../entitys/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

  async createTask(task: {text: string; listId: number; userId: number }): Promise<Task> {
    const createdTasks: Task[] = await this.taskRepository.query(`
      INSERT INTO Tasks ("text", "listId", "userId") 
      VALUES ('${ task.text }', ${ task.listId }, ${ task.userId }) 
      RETURNING id, "text", "isCompleted"
    `);
    return createdTasks[0];
  }

  async deleteTask(task: { id: number }): Promise<DeleteResult> {
    return this.taskRepository.query(`
      DELETE FROM Tasks 
      WHERE id = ${ task.id }
    `);
  }

  async setTaskStatus(id: number, isCompleted: boolean): Promise<UpdateResult> {
    return this.taskRepository.query(`
      UPDATE Tasks SET "isCompleted" = ${ isCompleted } 
      WHERE id = ${ id } AND "isCompleted" = ${ !isCompleted }
    `);
  }

}
