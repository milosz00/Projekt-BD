import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Visit } from 'src/app/models/visit';
import { AuthService } from 'src/app/services/auth.service';
import { DbQueryService } from 'src/app/services/db-query.service';
import { DoctorsService } from 'src/app/services/doctors.service';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-book-visit',
  templateUrl: './book-visit.component.html',
  styleUrls: ['./book-visit.component.css']
})
export class BookVisitComponent implements OnInit {

  constructor(private visitService: VisitsService, private doctorService: DoctorsService, private auth: AuthService, private queryService: DbQueryService) { }

  visits: Visit[] = [];
  doctors: Map<String, String> = new Map();
  email: string;
  patientKey: string; // TODO: zmień klucz 

  choosenDoctorsKeys: Array<String>;

  startDate = String("1990-01-01");
  endDate = String("2030-01-01");

  ngOnInit(): void {
    this.getVisits();
    this.getDoctors();
    this.email = this.auth.getCurrentUserEmail();
    this.getPatientKey();
  }

  getVisits(): void{
    this.visitService.getFreeVisits().pipe(
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

  findDoctorName(key: String): String{
    return this.doctors.get(key);
  }

  addVisit(key: string): void{
    this.visitService.addPatientToVisit(key, this.patientKey);
  }

  resetFilter(): void{
    this.startDate = String("1990-01-01");
    this.endDate = String("2030-01-01");
  }

  getPatientKey(): void {
    this.queryService.findPatientByEmail(this.email, "snapshot").pipe(
      map(changes =>
      
        changes.map(c =>
        
        ({​​ key: c.payload.key, ...c.payload.val() }​​)
        
        ))
      
      ).subscribe(
      
      patients => {​​this.patientKey = patients[0].key;}​​);
  }
}