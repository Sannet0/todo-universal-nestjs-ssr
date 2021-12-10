import { Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtGuard } from '../guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('list/:listId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(@Param() param: { listId: string }, @Req() req: any) {
    return this.tasksService.getAllTasks(param.listId, req.user.id);
  }

  @Delete("complete")
  deleteCompleted(@Param() param: { listId: string }, @Req() req: any) {
    return this.tasksService.deleteCompletedTask(param.listId, req.user.id);
  }

  @Patch("all")
  setAllComplete(@Param() param: { listId: string }, @Req() req: any){
    return this.tasksService.setAllComplete(param.listId, req.user.id);
  }
}
