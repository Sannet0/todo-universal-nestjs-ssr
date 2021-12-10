import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageModule } from './auth-page/auth-page.module';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageModule } from './main-page/main-page.module';
import { StateModule } from './state/state.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DashboardPageModule } from './dashboard-page/dashboard-page.module';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NotfoundPageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    TransferHttpCacheModule,
    StateModule,
    AppRoutingModule,
    AuthPageModule,
    MainPageModule,
    FormsModule,
    DashboardPageModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
