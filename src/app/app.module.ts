import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { ChatlogComponent } from './chatlog/chatlog.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MessageComponent } from './message/message.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AngularSimplemdeModule } from 'angular-simplemde';
import { MarkdownModule } from 'ngx-markdown';
import { SecurityContext } from '@angular/core';
import { MessageBoxComponent } from './message-box/message-box.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatlogComponent,
    MessageDialogComponent,
    MessageComponent,
    MessageBoxComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    EditorModule,
    AngularSimplemdeModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
