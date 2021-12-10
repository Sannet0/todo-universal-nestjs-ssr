import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ITask } from '../interface/task-interface';
import { FilterType, TaskService } from '../services/task.service';
import { AppService } from '../services/app.service';
import { ActivatedRoute } from '@angular/router';

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
  listId: number = this.actRoute.snapshot.params.listId;

  constructor(
    private taskService: TaskService,
    private appService: AppService,
    private actRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  addNewTask(): void {
    if (this.currentTaskName.trim()) {
      this.taskService.addNew(this.currentTaskName, this.listId);
    }
    this.currentTaskName = '';
  }

  changeOptions(type: FilterType): void {
    this.taskService.setFilterType(type);
  }


  selectAllTasks(): void {
    this.taskService.selectAll(this.listId);
  }

  clearCompletedTasks(): void {
    this.taskService.setFilterType(FilterType.all);
    this.taskService.deleteCompleted(this.listId);
  }

  ngOnInit() {
    if(this.isHTMLLoaded){
      this.onInitOnBrowser();
    }
  }

  onInitOnBrowser() {
    this.taskService.loadAll(this.listId);
    this.isDataLoad = true;
  }
}
