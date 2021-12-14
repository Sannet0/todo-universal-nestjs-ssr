import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { List } from '../entitys/list.entity';

@UseGuards(JwtGuard)
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  async all(@Req() req: any): Promise<List[]> {
    return this.listService.getAll(req.user.id);
  }

  @Post()
  async add(@Body() dto: CreateListDto, @Req() req: any): Promise<List> {
    return this.listService.createList({ ...dto, userId: req.user.id });
  }

}
