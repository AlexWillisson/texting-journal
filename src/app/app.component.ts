import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Message } from './message/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'texting-journal';
  messageList: Message[] = [
    {
      contents: 'This is the first message',
    },
    {
      contents: 'The second one',
    },
  ];

  constructor(private dialog: MatDialog) {}

  // newMessage(): void {
  //   const dialogRef = this.dialog.open(MessageDialogComponent, {
  //     width: '270px',
  //     data: {
  //       message: {},
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: MessageDialogResult) => this.messageList.push(result.message));
  // }
}
