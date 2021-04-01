import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgAuthService } from '../auth/ng-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  messageCollection!: string;
  therapyTime: string = '';

  constructor(
    public ngAuthService: NgAuthService,
    private store: AngularFirestore
  ) {}

  ngOnInit(): void {
    // this.store
    //   .collection('user-settings')
    //   .doc(this.ngAuthService.getUser.uid)
    //   .get();
  }

  updateTherapyTime() {
    this.store
      .collection('user-settings')
      .doc(this.ngAuthService.getUser.uid)
      .set({ therapyTime: this.therapyTime }, { merge: true });
  }
}
