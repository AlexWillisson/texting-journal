import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  singleDayDate: string = '';
  startDate: string = '';
  endDate: string = '';
  startWeekDate: string = '';
  endWeekDate: string = '';

  constructor(
    public ngAuthService: NgAuthService,
    private fileSaverService: FileSaverService,
    private store: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.messageCollection = 'messages-' + this.ngAuthService.getUser.uid;
  }

  updateStartWeek(startWeek: string): void {
    this.startWeekDate = startWeek;
  }

  updateEndWeek(endWeek: string): void {
    this.endWeekDate = endWeek;
  }

  markdownRenderMessage(message: Message): string {
    return (
      '###### _' +
      message.datetime.toLocaleString('en-US') +
      '_\n\n' +
      message.contents
    );
  }

  fetchDayJournal() {
    const targetDay = new Date(this.singleDayDate);
    const nextDay = new Date(this.singleDayDate);
    nextDay.setDate(nextDay.getDate() + 1);

    this.store
      .collection(this.messageCollection, (ref) =>
        ref.where('datetime', '>=', targetDay).where('datetime', '<', nextDay)
      )
      .get()
      .subscribe({
        next: (snapshot) => {
          this.downloadQuerySnapshot(
            snapshot,
            'journal-' + targetDay.toISOString().split('T')[0] + '.md'
          );
        },
      });
  }

  fetchWeekJournal() {
    const nextDay = new Date(this.endWeekDate);
    nextDay.setDate(nextDay.getDate() + 1);

    this.generateRangeJournal(
      new Date(this.startWeekDate),
      nextDay,
      'journal-week.md'
    );
  }

  fetchRangeJournal() {
    const nextDay = new Date(this.endDate);
    nextDay.setDate(nextDay.getDate() + 1);

    this.generateRangeJournal(
      new Date(this.startDate),
      nextDay,
      'journal-range.md'
    );
  }

  generateRangeJournal(startDate: Date, endDate: Date, filename: string) {
    this.store
      .collection(this.messageCollection, (ref) =>
        ref.where('datetime', '>=', startDate).where('datetime', '<', endDate)
      )
      .get()
      .subscribe({
        next: (snapshot) => {
          this.downloadQuerySnapshot(snapshot, filename);
        },
      });
  }

  fetchFullJournal() {
    this.store
      .collection(this.messageCollection)
      .get()
      .subscribe({
        next: (snapshot) => {
          this.downloadQuerySnapshot(snapshot, 'full-journal.md');
        },
      });
  }

  downloadQuerySnapshot(
    snapshot: firebase.firestore.QuerySnapshot<unknown>,
    filename: string
  ) {
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
      filename
    );
  }
}
