import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Visit } from 'src/app/models/visit';
import { DoctorsService } from 'src/app/services/doctors.service';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})

export class VisitsComponent implements OnInit {

  constructor(private visitService: VisitsService, private doctorService: DoctorsService) { }

  ngOnInit(): void {
    this.getVisits();
    this.getDoctors();
  }

  visits: Visit[] = [];
  doctors: Map<String, String> = new Map();
  patientKey: string = "-MZKMRbirtB-S8UUiWZe";  // TODO: zmien aby pobierało poprawny key 

  getVisits(): void{
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
}