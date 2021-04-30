import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { DoctorsService } from 'src/app/services/doctors.service';
import { PatientsService } from 'src/app/services/patients.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formAddDoctorVisible = false;
  formAddPatientVisible = false;
  listDoctorsVisible = false;
  listPatientsVisible = false;
  formTitle: string;

  doctors: Doctor[] = [];
  patients: Patient[] = [];

  constructor(private doctorService: DoctorsService, private patientService: PatientsService) { }

  ngOnInit(): void {
    this.getDoctorsList();
    this.getPatientsList();
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
      
      this.listDoctorsVisible = false; this.listPatientsVisible = false; this.formAddPatientVisible = false;
      this.formTitle = "Add Doctor";
    } else if(formChosen === 1){
      this.formAddPatientVisible = !this.formAddPatientVisible;
      
      this.listDoctorsVisible = false; this.listPatientsVisible = false; this.formAddDoctorVisible = false;
      this.formTitle = "Add Patient";
    } else if(formChosen === 2) {
      this.listDoctorsVisible = !this.listDoctorsVisible;

      this.formAddPatientVisible = false; this.listPatientsVisible = false; this.formAddDoctorVisible = false;
    } else {
      this.listPatientsVisible = !this.listPatientsVisible;

      this.formAddPatientVisible = false; this.listDoctorsVisible = false; this.formAddDoctorVisible = false;
    }
  }

  deleteDoctor(key: string): void {
    this.doctorService.deleteDoctor(key);
  }

  deletePatient(key: string): void {
    this.patientService.deletePatient(key);
  }

  getDoctorsList(): void {
    this.doctorService.getDoctors().pipe(

      map(changes =>
      
        changes.map(c =>
        
        ({​​ key: c.payload.key, ...c.payload.val() }​​)
        
        ))
      
      ).subscribe(
      
      doctors => {​​this.doctors = doctors;console.log(this.doctors)}​​);
  }

  getPatientsList(): void {
    this.patientService.getPatients().pipe(
      map(changes =>
      
        changes.map(c =>
        
        ({​​ key: c.payload.key, ...c.payload.val() }​​)
        
        ))
      
      ).subscribe(
      
      patients => {​​this.patients = patients;console.log(this.patients)}​​);
  }

}
