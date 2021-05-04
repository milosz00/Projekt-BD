import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/auth.service';
import { Alert } from 'src/app/models/alert';

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

  // constructor(private auth: AuthService) { }

  // ngOnInit(): void {
  //   if(localStorage.getItem('user') !== null)
  //     this.isLogged = true;
  //   else
  //     this.isLogged = false;
  //   this.getPersistence();
  // }

  // onLogIn(){
  //   this.auth.logIn(this.email,this.password,this.persistence.value).catch(
  //     err => {this.errorInfo = err.message; this.alertVisible = true;}
  //   )
  // }
  // getPersistence(){
  //   this.auth.getPersistence().subscribe(c => {this.persistence = c;});
  // }

  onLogIn() {}

  hideAlert(){
    this.alertVisible = false;
  }

}