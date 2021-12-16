import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../entitys/list.entity';

@Injectable()
export class ListService {
  constructor(@InjectRepository(List) private listRepository: Repository<List>) {}

  async getAll(userId: number): Promise<List[]> {
    return this.listRepository.query(`
      SELECT id, "title" FROM List 
      WHERE "userId" = ${ userId } 
      ORDER BY id ASC
    `);
  }

  async createList(list: { title: string; userId: number }): Promise<List> {
    const createdLists: List[] = await this.listRepository.query(`
      INSERT INTO List ("title", "userId") 
      VALUES ('${ list.title }', ${ list.userId }) 
      RETURNING id, "title"
    `);
    return createdLists[0];
  }

}
