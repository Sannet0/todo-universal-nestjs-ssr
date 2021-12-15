import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { TasksModule } from './tasks/tasks.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { Task } from './entitys/task.entity';
import { User } from './entitys/user.entity';
import { List } from './entitys/list.entity';
import { ListModule } from './list/list.module';
import { configuration } from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration]
    }),
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
      viewsPath: join(process.cwd(), 'dist/my-app/browser'),
      bootstrap: AppServerModule
    }),
    TaskModule,
    TasksModule,
    UserModule,
    ListModule,
    TokensModule
  ],
})
export class AppModule {
}
