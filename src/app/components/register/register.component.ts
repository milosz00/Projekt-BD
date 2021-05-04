import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = ''; password = ''; password_repeat = ''; userRole = null;
  
  alertVisible = false;
  errorInfo = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onCreateUser(): void {
    if(!this.validatePassword())
      return;
    if(!this.validateRadioButton())
      return;
    
    this.auth.createUser(this.email,this.password, this.userRole)
    .catch( err => {this.errorInfo = err.message; this.alertVisible = true;})
  }

  validatePassword(): boolean {
    if(this.password !== this.password_repeat) {
      this.alertVisible = true;
      this.errorInfo = "Passwords are not the same!";
      return false;
    } else {
      this.alertVisible = false;
    }
    return true;
  }

  validateRadioButton(): boolean {
    if(this.userRole === null) {
      this.alertVisible = true;
      this.errorInfo = "You must choose doctor or patient role!";
      return false;
    } else {
      this.alertVisible = false;
    }
    return true;
  }
 
  hideAlert(): void{
    this.alertVisible = false;
  }

}