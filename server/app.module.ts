import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { TasksModule } from './tasks/tasks.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { Task } from './entitys/task.entity';
import { User } from './entitys/user.entity';
import { List } from './entitys/list.entity';
import { ListModule } from './list/list.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Task, User, List],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/my-app/browser')
    }),
    TaskModule,
    TasksModule,
    UserModule,
    ListModule
  ],
})
export class AppModule {
}
