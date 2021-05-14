import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DbQueryService } from 'src/app/services/db-query.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string;
  userEmail: string;
  user: any[];
  constructor(private auth: AuthService, private queryService: DbQueryService) { }

  ngOnInit(): void {
    console.log(this.auth.getCurrentUserEmail());
    this.userEmail = this.auth.getCurrentUserEmail();
    this.getDoctorWithEmail(this.userEmail);
    this.getPatientWithEmail(this.userEmail);
  }

  getDoctorWithEmail(email: string) {
    this.queryService.findDoctorByEmail(email, "value").subscribe(x=>{this.user = x;console.log(x)});
  }

  getPatientWithEmail(email: string) {
    this.queryService.findPatientByEmail(email, "value").subscribe(x=>{if(this.user.length === 0) this.user = x; console.log(this.user)});
  }

}
