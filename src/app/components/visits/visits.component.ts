import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Visit } from 'src/app/models/visit';
import { AuthService } from 'src/app/services/auth.service';
import { DbQueryService } from 'src/app/services/db-query.service';
import { DoctorsService } from 'src/app/services/doctors.service';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})

export class VisitsComponent implements OnInit {

  constructor(private visitService: VisitsService, private doctorService: DoctorsService, private queryService: DbQueryService, private auth: AuthService) { }

  email: string;
  patientKey: string = "";  // TODO: zmien aby pobierało poprawny key 

  ngOnInit(): void {
    this.getDoctors();
    this.email = this.auth.getCurrentUserEmail();
    console.log(this.email);
    this.getPatientKey();
    // this.getVisits();
  }

  visits: Visit[] = [];
  doctors: Map<String, String> = new Map();

  getVisits(): void{
    console.log(this.patientKey);
    this.visitService.getPatientVisits(this.patientKey).pipe(
      map(changes =>
      
        changes.map(c =>
        
        ({​​ key: c.payload.key, ...c.payload.val() }​​)
        
        ))
      
      ).subscribe(
      
      visits => {​​this.visits = visits;console.log(this.visits)}​​);
  }

  getDoctors(): void{
    this.doctorService.getDoctors().pipe(
      map(changes =>
      
        changes.map(c =>
        
        ({​​ key: c.payload.key, ...c.payload.val() }​​)
        
        ))
      
      ).subscribe(
      
      values => {values.forEach(value => {this.doctors.set(value.key, value.firstname + " " + value.lastname)});console.log(this.doctors)}​​);
  }

  findDoctorName(key: String){
    return this.doctors.get(key);
  }

  deleteVisit(key: string){
    this.visitService.deletePatientFromVisit(key);
  }

  getPatientKey(): void {
    this.queryService.findPatientByEmail(this.email, "snapshot").pipe(
      map(changes =>
      
        changes.map(c =>
        
        ({​​ key: c.payload.key, ...c.payload.val() }​​)
        
        ))
      
      ).subscribe(
      
      patients => {
        if(patients.length > 0) {
        ​ ​ this.patientKey = patients[0].key;
          console.log(this.patientKey);
        }
        this.getVisits();
      }​​);
  }
}