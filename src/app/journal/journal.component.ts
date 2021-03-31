import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../message/message';

const getObservable = (collection: AngularFirestoreCollection<Message>) => {
  const subject = new BehaviorSubject<Message[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Message[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css'],
})
export class JournalComponent implements OnInit {
  messageList = getObservable(this.store.collection('messageList'));
  @ViewChild('messagesContainer')
  private messagesContainer!: ElementRef;
  sortedMessages: Message[] = [];

  constructor(private store: AngularFirestore) {}

  ngOnInit(): void {
    setTimeout(() => this.scrollToBottom(), 500);
    this.messageList.subscribe((message) => {
      this.sortedMessages = this.messageList
        .getValue()
        .sort((a, b) => (a.datetime > b.datetime ? 1 : -1));
      this.scrollToBottom();
    });
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  addMessage(newMessage: Message) {
    this.store.collection('messageList').add(newMessage);
  }
}
