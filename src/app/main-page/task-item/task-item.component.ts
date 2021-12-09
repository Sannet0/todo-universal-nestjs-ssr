import { Component, Input } from '@angular/core';
import { ITask } from '../../interface/task-interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task: ITask;
  isChecked: boolean = true;

  constructor(private taskService: TaskService) {}

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  onChangeCompletedStatus(id: number, event: Event): void {
    if(this.isChecked){
      this.isChecked = false;
      this.taskService.changeStatus(id, (event.target as HTMLInputElement).checked);
    }
  }
}
