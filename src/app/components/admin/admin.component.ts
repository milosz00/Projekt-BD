import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { DoctorsService } from 'src/app/services/doctors.service';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formAddDoctorVisible = false;
  formAddPatientVisible = false;
  formTitle: string;

  constructor(private doctorService: DoctorsService, private patientService: PatientsService) { }

  ngOnInit(): void {
  }

  // forms inputs
  firstname = "";
  lastname = "";
  telephone = null;
  email = null;
  specialization = "";
  address = "";  


  addPerson(): void {
    if(this.formAddDoctorVisible) {
      const doctor: Doctor = {
        firstname: this.firstname,
        lastname: this.lastname,
        telephoneNumber: this.telephone,
        email: this.email,
        specialization: this.specialization,
        officeAddress: this.address,
        workHours: null,
      };

      this.doctorService.createDoctor(doctor);

    } else if(this.formAddPatientVisible){
      const patient: Patient = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        telephoneNumber: this.telephone,
        pesel: "",
      }

      this.patientService.createPatient(patient);
    }

    this.firstname = "";
    this.lastname = "";
    this.telephone = null;
    this.email = null;
    this.specialization = "";
    this.address = "";
  }


  changeVisible(formChosen): void {
    if(formChosen === 0) {
      this.formAddDoctorVisible = !this.formAddDoctorVisible;
      this.formAddPatientVisible = false;
      this.formTitle = "Add Doctor";
    } else {
      this.formAddPatientVisible = !this.formAddPatientVisible;
      this.formAddDoctorVisible = false;
      this.formTitle = "Add Patient";
    }
  }
}
