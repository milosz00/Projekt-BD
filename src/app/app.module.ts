import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VisitsComponent } from './components/visits/visits.component';
import { PatientsComponent } from './components/patients/patients.component';
import { WorkHoursComponent } from './components/work-hours/work-hours.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AdminComponent } from './components/admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DoctorsService } from './services/doctors.service';
import { PatientsService } from './services/patients.service';
import { AccountActiveComponent } from './components/account-active/account-active.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VisitsComponent,
    PatientsComponent,
    WorkHoursComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    AccountActiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgbModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
