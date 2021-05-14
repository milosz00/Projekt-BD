import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DbQueryService } from './services/db-query.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  collapsed = true;
  loginState = null;
  isAdmin = false;
  isDoctor = false;
  isPatient = false;

  constructor(private auth: AuthService, private queryService: DbQueryService) {
  }

  ngOnInit(): void {
    this.loginState = this.auth.getState().subscribe(user => {
      if(user){
        this.loginState = true;
        if(user.email === 'admin@admin.com')
          this.isAdmin = true;
        else{

          this.queryService.findDoctorByEmail(user.email, "value").subscribe(x => {
            if(x.length > 0){ 
              this.isDoctor = true;
              return;
            }
          })

          this.queryService.findPatientByEmail(user.email, "value"). subscribe(x => {
            if(x.length > 0) {
              this.isPatient = true;
              return;
            } 
          })

        }
      }
      else{
        this.loginState = false;
        this.isAdmin = false;
        this.isPatient = false;
        this.isDoctor = false;
      }
    })
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  logOut() {
    this.auth.logOut();
  }
}
