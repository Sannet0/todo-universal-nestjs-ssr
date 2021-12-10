import { Body, Controller, Delete, Patch, Post, Param, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/creating-task.dto';
import { ChangeTaskDto } from './dto/change-task.dto';
import { StatusTaskDto } from './dto/status-task.dto';
import { JwtGuard } from '../guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  add(@Body() dto: CreateTaskDto, @Req() req: any) {
    return this.taskService.createTask({ ...dto, userId: req.user.id });
  }

  @Delete(':id')
  delete(@Param() dto: ChangeTaskDto) {
    return this.taskService.deleteTask(dto);
  }

  @Patch(':id')
  setStatus(@Param() paramDto: ChangeTaskDto, @Body() bodyDto: StatusTaskDto) {
    return this.taskService.setTaskStatus({ id: paramDto.id, isCompleted: bodyDto.isCompleted });
  }
}
