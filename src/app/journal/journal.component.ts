import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NgAuthService } from '../auth/ng-auth.service';
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
  @ViewChild('messagesContainer')
  private messagesContainer!: ElementRef;
  sortedMessages: Message[] = [];
  private messageCollection!: string;
  private messageList!: BehaviorSubject<Message[]>;

  constructor(
    private store: AngularFirestore,
    private router: Router,
    private ngAuthService: NgAuthService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.scrollToBottom(), 500);
    const user = this.ngAuthService.getUser;
    this.messageCollection = 'messages-' + user.uid;
    this.messageList = getObservable(
      this.store.collection(this.messageCollection)
    );
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
    return <Message>{
      contents: atob(message.contents),
      datetime: message.datetime,
    };
  }

  addMessage(newMessage: Message) {
    this.store.collection(this.messageCollection).add(<Message>{
      contents: btoa(newMessage.contents),
      datetime: newMessage.datetime,
    });
  }
}
