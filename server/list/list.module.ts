import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { List } from '../entitys/list.entity';
import { ListController } from './list.controller';
import { ListService } from './list.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService]
})
export class ListModule {}
