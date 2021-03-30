import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DefaultActions, ISimpleMdeConfig } from 'angular-simplemde-resettable';

import { Message } from '../message/message';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
})
export class MessageBoxComponent implements OnInit {
  @Output() newMessage = new EventEmitter<Message>();

  editorInput: string = '';

  config: ISimpleMdeConfig = {
    actions: DefaultActions,
  };

  send(): void {
    this.newMessage.emit({
      contents: this.editorInput,
    });
    this.editorInput = '';
  }

  constructor() {}

  ngOnInit(): void {}
}
