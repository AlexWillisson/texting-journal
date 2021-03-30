import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MessageComponent } from './message/message.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { MarkdownModule } from 'ngx-markdown';
import { SecurityContext } from '@angular/core';
import { MessageBoxComponent } from './message-box/message-box.component';
import { AngularSimplemdeModule } from 'angular-simplemde-resettable';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppComponent, MessageComponent, MessageBoxComponent],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularSimplemdeModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
    }),
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
