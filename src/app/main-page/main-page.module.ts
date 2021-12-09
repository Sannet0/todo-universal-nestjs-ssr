import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskItemSkeletonComponent } from './task-item-skeleton/task-item-skeleton.component';



@NgModule({
  declarations: [
    TaskItemComponent,
    TaskItemSkeletonComponent
  ],
  exports: [
    TaskItemComponent,
    TaskItemSkeletonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainPageModule { }
