import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../entitys/list.entity';

@Injectable()
export class ListService {
  constructor(@InjectRepository(List) private listRepository: Repository<List>) {}

  async getAll(userId: number): Promise<List[]> {
    const lists: List[] = await this.listRepository.find({
      where: { userId },
      order: { id: 'ASC' }
    });

    lists.forEach((list: List) => {
      delete list.tasks;
    });

    return lists;
  }

  async createList(list: { title: string; userId: number; }): Promise<List> {
    return this.listRepository.save(list);
  }

}
