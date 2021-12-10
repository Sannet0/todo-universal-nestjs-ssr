import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './dashboard-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { ListItemComponent } from './list-item/list-item.component';



@NgModule({
  declarations: [
    DashboardPageComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardPageModule { }
