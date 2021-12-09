import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ITask } from '../interface/task-interface';
import { FilterType, TaskService } from '../services/task.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  isDataLoad: boolean;
  isHTMLLoaded: boolean = isPlatformBrowser(this.platformId);
  taskTemplate: any[] = [0, 1, 2, 3, 4, 5];
  tasks: ITask[];
  filterType = FilterType;
  currentTaskName = '';
  isDataLoad$ = this.appService.isDataLoad$;
  taskCount$ = this.taskService.taskCount$;
  tasksLeftCount$ = this.taskService.tasksLeftCount$;
  filteredTasks$ = this.taskService.filteredTasks$;

  constructor(
    private taskService: TaskService,
    private appService: AppService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  addNewTask(): void {
    if (this.currentTaskName.trim()) {
      this.taskService.addNew(this.currentTaskName);
    }
    this.currentTaskName = '';
  }

  changeOptions(type: FilterType): void {
    this.taskService.setFilterType(type);
  }


  selectAllTasks(): void {
    this.taskService.selectAll();
  }

  clearCompletedTasks(): void {
    this.taskService.setFilterType(FilterType.all);
    this.taskService.deleteCompleted();
  }

  ngOnInit() {
    if(this.isHTMLLoaded){
      this.onInitOnBrowser();
    }
  }

  onInitOnBrowser() {
    this.taskService.loadAll();
    this.isDataLoad = true;
  }
}
