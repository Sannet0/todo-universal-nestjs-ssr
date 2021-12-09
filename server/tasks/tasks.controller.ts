import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll() {
    return this.tasksService.getAllTasks();
  }

  @Delete("complete")
  deleteCompleted() {
    return this.tasksService.deleteCompletedTask();
  }

  @Patch("all")
  setAllComplete(){
    return this.tasksService.setAllComplete();
  }
}
