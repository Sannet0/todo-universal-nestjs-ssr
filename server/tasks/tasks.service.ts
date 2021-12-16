import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Task } from '../entitys/task.entity';
import { ListService } from '../list/list.service';
import { List } from '../entitys/list.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>, private readonly listService: ListService) {}

  async getAllTasks(listId: string, userId: number): Promise<Task[]> {
    const isUserHaveList = await this.isUserHavList(listId, userId);
    if (isUserHaveList) {
      return this.taskRepository.query(`
        SELECT * FROM Tasks 
        WHERE "listId" = '${ listId }' 
        ORDER BY id ASC
      `);
    }

    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async deleteCompletedTask(listId: string, userId: number): Promise<any> {
    const isUserHaveList = await this.isUserHavList(listId, userId);
    if (isUserHaveList) {
      return this.taskRepository.query(`
        DELETE FROM Tasks 
        WHERE "listId" = '${ listId }' AND "isCompleted" = true
      `);
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async setAllCompleteTasks(listId: string, userId: number): Promise<UpdateResult> {
    const isUserHaveList = await this.isUserHavList(listId, userId);
    if (isUserHaveList) {
      return this.taskRepository.query(`
        UPDATE Tasks SET "isCompleted" = true 
        WHERE "listId" = '${ listId }' 
        AND "isCompleted" = false
      `);
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async isUserHavList(listId: string, userId: number): Promise<boolean> {
    const allLists: List[] = await this.listService.getAll(userId);
    let isListFound = false;
    allLists.forEach((list: List) => {
      if (list.id.toString() === listId) {
        isListFound = true;
      }
    });

    return isListFound;
  }

}
