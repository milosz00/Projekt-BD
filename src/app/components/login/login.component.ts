import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/auth.service';
import { Alert } from 'src/app/models/alert';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  isLogged = false;
  email: string; password: string;
  persistence: any;
  alert: Alert;

  alertVisible = false;
  errorInfo = '';

  ngOnInit() {}

  constructor(private auth: AuthService) { }

  onLogIn(){
    this.auth.logIn(this.email,this.password).catch(
      err => {this.errorInfo = err.message; this.alertVisible = true;}
    )
  }


  hideAlert(){
    this.alertVisible = false;
  }

}