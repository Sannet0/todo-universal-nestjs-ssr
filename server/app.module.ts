import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './entitys/task.entity';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Task],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/my-app/browser')
    }),
    TaskModule,
    TasksModule,
  ],
})
export class AppModule {
}
