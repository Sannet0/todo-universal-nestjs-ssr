import { Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtGuard } from '../guards/jwt.guard';
import { Task } from '../entitys/task.entity';
import { UpdateResult } from 'typeorm';

@UseGuards(JwtGuard)
@Controller('list/:listId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAll(@Param() param: { listId: string }, @Req() req: any): Promise<Task[]> {
    return this.tasksService.getAllTasks(param.listId, req.user.id);
  }

  @Delete('complete')
  async deleteCompleted(@Param() param: { listId: string }, @Req() req: any): Promise<any> {
    return this.tasksService.deleteCompletedTask(param.listId, req.user.id);
  }

  @Patch('all')
  async setAllComplete(@Param() param: { listId: string }, @Req() req: any): Promise<UpdateResult> {
    return this.tasksService.setAllCompleteTasks(param.listId, req.user.id);
  }
}
