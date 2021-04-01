import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NgAuthService } from '../auth/ng-auth.service';
import { FirebaseMessage } from '../firebase-message';
import { Message } from './message/message';

const getObservable = (
  collection: AngularFirestoreCollection<FirebaseMessage>
) => {
  const subject = new BehaviorSubject<FirebaseMessage[]>([]);
  collection
    .valueChanges({ idField: 'id' })
    .subscribe((val: FirebaseMessage[]) => {
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
  private firebaseMessageList!: BehaviorSubject<FirebaseMessage[]>;

  constructor(
    private store: AngularFirestore,
    private ngAuthService: NgAuthService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.scrollToBottom(), 500);
    const user = this.ngAuthService.getUser;
    this.messageCollection = 'messages-' + user.uid;
    this.firebaseMessageList = getObservable(
      this.store.collection(this.messageCollection)
    );
    this.firebaseMessageList.subscribe((message) => {
      this.sortedMessages = this.firebaseMessageList
        .getValue()
        .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
        .map((message: FirebaseMessage) => {
          const decodedMessage: Message = {
            contents: atob(message.contents),
            timestamp: new Date(message.timestamp.seconds * 1000),
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
      timestamp: message.timestamp,
    };
  }

  addMessage(newMessage: Message) {
    this.store.collection(this.messageCollection).add(<Message>{
      contents: btoa(newMessage.contents),
      timestamp: newMessage.timestamp,
    });
  }
}
