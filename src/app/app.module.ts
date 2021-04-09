import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VisitsComponent } from './components/visits/visits.component';
import { PatientsComponent } from './components/patients/patients.component';
import { WorkHoursComponent } from './components/work-hours/work-hours.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VisitsComponent,
    PatientsComponent,
    WorkHoursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
