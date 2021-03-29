import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Message } from './message/message';
import {
  MessageDialogComponent,
  MessageDialogResult,
} from './message-dialog/message-dialog.component';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'texting-journal';
  // messageList: Message[] = [
  //   {
  //     contents: 'This is the first message',
  //   },
  //   {
  //     contents: 'The second one',
  //   },
  // ];
  messageList: Observable<Message[]> = this.store
    .collection<Message>('messageList')
    .valueChanges({ idField: 'id' });

  constructor(private dialog: MatDialog, private store: AngularFirestore) {}

  newMessage(): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '270px',
      data: {
        message: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: MessageDialogResult) =>
        this.store.collection('messageList').add(result.message)
      );
  }
}
