import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Message } from './message/message';

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
  messageCollection = 'encodedMessageList';
  messageList = getObservable(this.store.collection(this.messageCollection));
  @ViewChild('messagesContainer')
  private messagesContainer!: ElementRef;
  sortedMessages: Message[] = [];

  constructor(private store: AngularFirestore) {}

  ngOnInit(): void {
    setTimeout(() => this.scrollToBottom(), 500);
    this.messageList.subscribe((message) => {
      this.sortedMessages = this.messageList
        .getValue()
        .sort((a, b) => (a.datetime > b.datetime ? 1 : -1))
        .map((message: Message) => {
          const decodedMessage: Message = {
            contents: atob(message.contents),
            datetime: message.datetime,
          };

          return decodedMessage;
        });

      this.scrollToBottom();
    });
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  decodeMessage(message: Message): Message {
    const decodedMessage: Message = {
      contents: atob(message.contents),
      datetime: message.datetime,
    };

    return decodedMessage;
  }

  addMessage(newMessage: Message) {
    const encodedMessage: Message = {
      contents: btoa(newMessage.contents),
      datetime: newMessage.datetime,
    };

    this.store.collection(this.messageCollection).add(encodedMessage);
  }
}
