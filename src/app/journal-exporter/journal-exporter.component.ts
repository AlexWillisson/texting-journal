import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgAuthService } from '../auth/ng-auth.service';
import { FileSaverService } from 'ngx-filesaver';
import { Message } from '../journal/message/message';
import firebase from 'firebase';
import { Time } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';

@Component({
  selector: 'app-journal-exporter',
  templateUrl: './journal-exporter.component.html',
  styleUrls: ['./journal-exporter.component.css'],
})
export class JournalExporterComponent implements OnInit {
  @Input() therapyTimeInput!: string;
  messageCollection!: string;
  messageList: Message[] = [];
  singleDayDate: string = '';
  startDate: string = '';
  endDate: string = '';
  startWeekDate: string = '';
  endWeekDate: string = '';
  therapyTime: Time | undefined;

  constructor(
    public ngAuthService: NgAuthService,
    private fileSaverService: FileSaverService,
    private store: AngularFirestore,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.messageCollection = 'messages-' + this.ngAuthService.getUser.uid;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'therapyTimeInput': {
            if (this.therapyTimeInput) {
              const timeObject = new Date(
                '1970-01-01 ' + this.therapyTimeInput
              );

              this.therapyTime = {
                hours: timeObject.getHours(),
                minutes: timeObject.getMinutes(),
              };
            }
          }
        }
      }
    }
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
    const startDay = new Date(this.startWeekDate);
    const endDay = new Date(this.endWeekDate);

    if (this.therapyTime) {
      startDay.setHours(this.therapyTime.hours);
      startDay.setMinutes(this.therapyTime.minutes);
      endDay.setHours(this.therapyTime.hours);
      endDay.setMinutes(this.therapyTime.minutes);
    } else {
      startDay.setHours(0);
      startDay.setMinutes(0);
      endDay.setHours(23);
      endDay.setMinutes(59);
      endDay.setSeconds(59);
    }

    this.generateRangeJournal(startDay, endDay, 'journal-week.md');
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
    if (snapshot.docs.length == 0) {
      this.showUserError(new Error('No journal entries for time selected'));
      return;
    }

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

  showUserError(error: Error) {
    this.dialog.open(ErrorPopupComponent, { data: { error: error } });
  }
}
