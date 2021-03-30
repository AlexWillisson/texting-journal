import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Message } from './message/message';
import {
  MessageDialogComponent,
  MessageDialogResult,
} from './message-dialog/message-dialog.component';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { BehaviorSubject } from 'rxjs';

const getObservable = (collection: AngularFirestoreCollection<Message>) => {
  const subject = new BehaviorSubject<Message[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Message[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'texting-journal';
  messageList = getObservable(this.store.collection('messageList'));
  editorInput: string = '';

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
