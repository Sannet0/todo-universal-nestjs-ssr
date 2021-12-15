import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Task } from '../entitys/task.entity';
import { JwtModule } from '@nestjs/jwt';
import { ListModule } from '../list/list.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '10s'
      }
    }),
    ListModule
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
