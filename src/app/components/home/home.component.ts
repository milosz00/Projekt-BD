import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorsService } from 'src/app/services/doctors.service';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string;
  userEmail: string;
  user: any[];
  constructor(private auth: AuthService, private doctorService: DoctorsService, private patientsService: PatientsService) { }

  ngOnInit(): void {
    console.log(this.auth.getCurrentUserEmail());
    this.userEmail = this.auth.getCurrentUserEmail();
    this.getDoctorWithEmail(this.userEmail);
    this.getPatientWithEmail(this.userEmail);
  }

  getDoctorWithEmail(email: string) {
    this.doctorService.findDoctor(email).subscribe(x=>{this.user = x;console.log(x)});
  }

  getPatientWithEmail(email: string) {
    this.patientsService.findPatient(email).subscribe(x=>{if(this.user.length === 0) this.user = x; console.log(this.user)});
  }

}
