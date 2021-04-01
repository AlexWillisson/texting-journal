import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Message } from '../message/message';
import { TimestampedMessageBunch } from './timestamped-message-bunch';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
})
export class ChatHistoryComponent implements OnInit {
  @Input() messages!: Message[];
  public bunchedMessages: TimestampedMessageBunch[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'messages': {
            this.groupMessagesByMinute();
          }
        }
      }
    }
  }

  groupMessagesByMinute() {
    this.bunchedMessages = [];
    let currentBunch: TimestampedMessageBunch = {
      timestamp: new Date(0),
      messages: [],
    };

    const stagedMessages = this.messages.map((message) => {
      const roundedDate = new Date(message.timestamp);
      roundedDate.setSeconds(0, 0);
      return <Message>{
        timestamp: new Date(roundedDate),
        contents: message.contents,
      };
    });

    stagedMessages.forEach((message) => {
      if (currentBunch.timestamp.getTime() === message.timestamp.getTime()) {
        currentBunch.messages.push(message);
      } else {
        if (currentBunch.messages.length > 0) {
          this.bunchedMessages.push(currentBunch);
        }
        currentBunch = {
          timestamp: message.timestamp,
          messages: [message],
        };
      }
    });

    this.bunchedMessages.push(currentBunch);
  }
}
