import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { AuthService } from 'src/app/services/auth.service';
// import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  // forms inputs
  firstname = "";
  lastname = "";
  telephone = null;
  email = null;
  specialization = "";
  address = "";  
  password = ''; 
  password_repeat = ''; 
  userRole = null;
  pesel = '';

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
    
    let user = this.prepareUser();
    this.auth.createUser(this.email,this.password, this.userRole.toString().concat("s"), user, true)
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

  prepareUser(): any {
    if(this.userRole === 'patient') {
      let patient: Patient = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        telephoneNumber: this.telephone,
        pesel: this.pesel,
        active: true,
      }
      return patient;

    } else if(this.userRole === 'doctor') {
      let doctor: Doctor = {
        firstname: this.firstname,
        lastname: this.lastname,
        telephoneNumber: this.telephone,
        email: this.email,
        specialization: this.specialization,
        officeAddress: this.address,
        workHours: null,
        active: true,
      };
      return doctor
    }
    return null;
  }
}