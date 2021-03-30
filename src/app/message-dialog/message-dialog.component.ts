import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Message } from '../message/message';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
})
export class MessageDialogComponent implements OnInit {
  private backupMessage: Partial<Message> = { ...this.data.message };
  editorInput: string = '';

  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.data.message.contents = this.backupMessage.contents;
    this.dialogRef.close(this.data);
  }

  updateData(): void {
    this.data.message.contents = this.editorInput;
  }
}

export interface MessageDialogData {
  message: Partial<Message>;
  enableDelete: boolean;
}

export interface MessageDialogResult {
  message: Message;
  delete?: boolean;
}
