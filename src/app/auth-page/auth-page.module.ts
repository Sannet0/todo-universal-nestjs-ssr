import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthPageComponent } from './auth-page.component';

@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthPageComponent
  ]
})
export class AuthPageModule { }
