import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, TaskModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
