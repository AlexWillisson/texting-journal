import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Message } from '../message/message';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
})
export class MessageBoxComponent implements OnInit {
  @Output() newMessage = new EventEmitter<Message>();

  editorInput: string = '';

  send(): void {
    this.newMessage.emit({
      contents: this.editorInput,
    });
  }

  constructor() {}

  ngOnInit(): void {}
}
