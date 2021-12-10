import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';

@UseGuards(JwtGuard)
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  all(@Req() req: any) {
    return this.listService.getAll(req.user.id);
  }

  @Post()
  add(@Body() dto: CreateListDto, @Req() req: any) {
    return this.listService.createList({ ...dto, userId: req.user.id });
  }

}
