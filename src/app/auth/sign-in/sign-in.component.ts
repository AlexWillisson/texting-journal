import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService } from '../ng-auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(public ngAuthService: NgAuthService, public router: Router) {
    this.ngAuthService = ngAuthService;
    this.router = router;
  }

  ngOnInit() {
    if (this.ngAuthService.isLoggedIn) {
      this.router.navigate(['dashboard']);
    }
  }
}
