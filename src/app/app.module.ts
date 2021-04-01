import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { MessageComponent } from './journal/message/message.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { MarkdownModule } from 'ngx-markdown';
import { SecurityContext } from '@angular/core';
import { MessageBoxComponent } from './journal/message-box/message-box.component';
import { AngularSimplemdeModule } from 'angular-simplemde-resettable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { JournalComponent } from './journal/journal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { NgAuthService } from './auth/ng-auth.service';

import { FileSaverModule } from 'ngx-filesaver';
import { JournalExporterComponent } from './journal-exporter/journal-exporter.component';
import { WeekPickerComponent } from './journal-exporter/week-picker/week-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    MessageBoxComponent,
    JournalComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    JournalExporterComponent,
    WeekPickerComponent,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularSimplemdeModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
    }),
    FlexLayoutModule,
    AppRoutingModule,
    FileSaverModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [NgAuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
