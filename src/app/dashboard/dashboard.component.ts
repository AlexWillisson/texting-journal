import { Component, OnInit } from '@angular/core';
import { NgAuthService } from '../auth/ng-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  messageCollection!: string;
  therapyTime: string = '';

  constructor(public ngAuthService: NgAuthService) {}

  ngOnInit(): void {}
}
