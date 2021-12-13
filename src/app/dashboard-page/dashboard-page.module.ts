import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { DashboardPageComponent } from './dashboard-page.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardPageModule { }
