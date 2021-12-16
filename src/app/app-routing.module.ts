import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TaskItemComponent } from './main-page/task-item/task-item.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { TaskItemSkeletonComponent } from './main-page/task-item-skeleton/task-item-skeleton.component';
import { ListItemComponent } from './dashboard-page/list-item/list-item.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'list/:listId',
    component: MainPageComponent,
    children: [
      { path: '', component: TaskItemComponent },
      { path: '', component: TaskItemSkeletonComponent }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    children: [
      { path: '', component: ListItemComponent }
    ]
  },
  {
    path: 'notfound',
    component: NotfoundPageComponent
  },
  {
    path: 'auth',
    component: AuthPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


