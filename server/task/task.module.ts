import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entitys/task.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '10s'
      }
    })
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
