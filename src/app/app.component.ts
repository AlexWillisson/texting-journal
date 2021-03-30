import { Component } from '@angular/core';

import { Message } from './message/message';

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

  constructor(private store: AngularFirestore) {}

  addMessage(newMessage: Message) {
    this.store.collection('messageList').add(newMessage);
  }
}
