import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Task } from '../entitys/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task])
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
