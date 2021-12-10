import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'list/:listId',
    pathMatch: 'full',
    component: MainPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notfound',
    pathMatch: 'full',
    component: NotfoundPageComponent
  },
  {
    path: 'auth',
    pathMatch: 'full',
    component: AuthPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
