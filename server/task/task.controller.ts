import { Body, Controller, Delete, Patch, Post, Param, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/creating-task.dto';
import { ChangeTaskDto } from './dto/change-task.dto';
import { StatusTaskDto } from './dto/status-task.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { Task } from '../entitys/task.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async add(@Body() dto: CreateTaskDto, @Req() req: any): Promise<Task> {
    return this.taskService.createTask({ ...dto, userId: req.user.id });
  }

  @Delete(':id')
  async delete(@Param() dto: ChangeTaskDto): Promise<DeleteResult> {
    return this.taskService.deleteTask(dto);
  }

  @Patch(':id')
  async setStatus(@Param() paramDto: ChangeTaskDto, @Body() bodyDto: StatusTaskDto): Promise<UpdateResult> {
    return this.taskService.setTaskStatus(paramDto.id, bodyDto.isCompleted);
  }
}
