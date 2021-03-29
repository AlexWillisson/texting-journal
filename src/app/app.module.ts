import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ChatlogComponent } from './chatlog/chatlog.component';

@NgModule({
  declarations: [AppComponent, ChatlogComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
