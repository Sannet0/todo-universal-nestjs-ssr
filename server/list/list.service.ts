import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../entitys/list.entity';
import { ICreateList } from '../interfaces/create-list-interface';

@Injectable()
export class ListService {
  constructor(@InjectRepository(List) private listRepository: Repository<List>) {}

  async getAll(userId: number){
    return await this.listRepository.find({ where:
        { userId }
    })
  }

  async createList(list: ICreateList) {
    return this.listRepository.save(list);
  }

}
