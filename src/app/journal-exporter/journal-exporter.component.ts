import { Component, OnInit } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { NgAuthService } from '../auth/ng-auth.service';
import { FileSaverService } from 'ngx-filesaver';
import { Message } from '../journal/message/message';
import firebase from 'firebase';

@Component({
  selector: 'app-journal-exporter',
  templateUrl: './journal-exporter.component.html',
  styleUrls: ['./journal-exporter.component.css'],
})
export class JournalExporterComponent implements OnInit {
  messageCollection!: string;
  messageList: Message[] = [];

  constructor(
    public ngAuthService: NgAuthService,
    private fileSaverService: FileSaverService,
    private store: AngularFirestore
  ) {}

  ngOnInit(): void {}

  markdownRenderMessage(message: Message): string {
    return (
      '###### _' +
      message.datetime.toLocaleString('en-US') +
      '_\n\n' +
      message.contents
    );
  }

  fetchFullJournal() {
    this.messageCollection = 'messages-' + this.ngAuthService.userState.uid;

    this.store
      .collection(this.messageCollection)
      .get()
      .subscribe({
        next: (snapshot) => {
          this.downloadQuerySnapshot(snapshot);
        },
      });
  }

  downloadQuerySnapshot(snapshot: firebase.firestore.QuerySnapshot<unknown>) {
    this.fileSaverService.save(
      new Blob([
        snapshot.docs
          .map((queryDocumentSnapshot) => queryDocumentSnapshot.data())
          .map((message: any) => {
            const date = new Date(0);
            date.setUTCSeconds(message.datetime.seconds);

            return <Message>{
              contents: atob(message.contents),
              datetime: date,
            };
          })
          .sort((a, b) => (a.datetime > b.datetime ? 1 : -1))
          .map(this.markdownRenderMessage)
          .reduce(
            (collectedMessages, message) =>
              (collectedMessages = collectedMessages.concat('\n---\n', message))
          ),
      ]),
      'full-journal.md'
    );
  }
}
