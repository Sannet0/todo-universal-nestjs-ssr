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
      return this.taskRepository.find({
        where: { listId },
        order: { id: 'ASC' }
      });
    }

    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async deleteCompletedTask(listId: string, userId: number): Promise<Task[]> {
    const isUserHaveList = await this.isUserHavList(listId, userId);
    if (isUserHaveList) {
      const completeTasks: Task[] = await this.taskRepository.find({
        where: {
          listId,
          isCompleted: true
        },
      });
      return this.taskRepository.remove(completeTasks);
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async setAllComplete(listId: string, userId: number): Promise<UpdateResult> {
    const isUserHaveList = await this.isUserHavList(listId, userId);
    if (isUserHaveList) {
      const property: any = await this.taskRepository.find({
        where: {
          listId,
          isCompleted: false
        }
      });
      return this.taskRepository.update(property, { isCompleted: true });
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
