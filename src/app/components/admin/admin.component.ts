import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { DoctorsService } from 'src/app/services/doctors.service';
import { PatientsService } from 'src/app/services/patients.service';
import { map } from 'rxjs/operators';
import { VisitsService } from 'src/app/services/visits.service';
import { Visit } from 'src/app/models/visit';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formAddDoctorVisible = false;
  formAddPatientVisible = false;
  formAddVisitVisible = false;
  listDoctorsVisible = false;
  listPatientsVisible = false;
  listVisitsVisible = false;
  formTitle: string;

  doctors: Doctor[] = [];
  patients: Patient[] = [];
  visits: Visit[] = [];

  constructor(private doctorService: DoctorsService, private patientService: PatientsService, private visitService: VisitsService) { }

  ngOnInit(): void {
    this.getDoctorsList();
    this.getPatientsList();
    this.getVisitsList();
  }

  // forms inputs
  firstname = "";
  lastname = "";
  telephone = null;
  email = null;
  specialization = "";
  address = "";  

  // form inputs for adding visit
  doctorKey = "";
  startDate = null;
  endDate = null;


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
        active: false,
        role: "doctor",
      };

      this.doctorService.createDoctor(doctor);

    } else if(this.formAddPatientVisible){
      const patient: Patient = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        telephoneNumber: this.telephone,
        pesel: "",
        active: false,
        role: "patient",
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

  addVisit(): void {
    const visit: Visit = {
      doctorKey: this.doctorKey,
      startDate: this.startDate,
      endDate: this.endDate,
      patientKey: "",
    };

    console.log(visit);
    this.visitService.createVisit(visit);

    this.doctorKey = "";
    this.startDate = new Date();
    this.endDate = new Date();
  }


  changeVisible(formChosen): void {
    if(formChosen === 0) {
      this.formAddDoctorVisible = !this.formAddDoctorVisible;
      
      this.listDoctorsVisible = false; this.listPatientsVisible = false; this.formAddPatientVisible = false; this.formAddVisitVisible = false; this.listVisitsVisible = false;
      this.formTitle = "Add Doctor";
    } else if(formChosen === 1){
      this.formAddPatientVisible = !this.formAddPatientVisible;
      
      this.listDoctorsVisible = false; this.listPatientsVisible = false; this.formAddDoctorVisible = false; this.formAddVisitVisible = false; this.listVisitsVisible = false;
      this.formTitle = "Add Patient";
    } else if(formChosen === 2) {
      this.listDoctorsVisible = !this.listDoctorsVisible;

      this.formAddPatientVisible = false; this.listPatientsVisible = false; this.formAddDoctorVisible = false; this.formAddVisitVisible = false; this.listVisitsVisible = false;
    } else if(formChosen == 3){
      this.listPatientsVisible = !this.listPatientsVisible;

      this.formAddPatientVisible = false; this.listDoctorsVisible = false; this.formAddDoctorVisible = false; this.formAddVisitVisible = false; this.listVisitsVisible = false;
    } else if(formChosen == 6){
      this.formAddVisitVisible = !this.formAddVisitVisible;

      this.formAddDoctorVisible = false; this.listDoctorsVisible = false; this.listPatientsVisible = false; this.formAddPatientVisible = false; this.listVisitsVisible = false;
    } else if(formChosen == 7){
      this.listVisitsVisible = !this.listVisitsVisible;

      this.formAddDoctorVisible = false; this.listDoctorsVisible = false; this.listPatientsVisible = false; this.formAddPatientVisible = false; this.formAddVisitVisible = false;
    }
  }

  deleteDoctor(key: string): void {
    this.doctorService.deleteDoctor(key);
  }

  deletePatient(key: string): void {
    this.patientService.deletePatient(key);
  }

  deleteVisit(key: string): void {
    this.visitService.deleteVisit(key);
  }

  getDoctorsList(): void {
    this.doctorService.getDoctors().pipe(

      map(changes =>
      
        changes.map(c =>
        
        ({​​ key: c.payload.key, ...c.payload.val() }​​)
        
        ))
      
      ).subscribe(
      
      doctors => {​​this.doctors = doctors;}​​);
  }

  getPatientsList(): void {
    this.patientService.getPatients().pipe(
      map(changes =>
      
        changes.map(c =>
        
        ({​​ key: c.payload.key, ...c.payload.val() }​​)
        
        ))
      
      ).subscribe(
      
      patients => {​​this.patients = patients;}​​);
  }

  getVisitsList(): void{
    this.visitService.getAllVisits().pipe(
      map(changes =>
      
        changes.map(c =>
        
        ({​​ key: c.payload.key, ...c.payload.val() }​​)
        
        ))
      
      ).subscribe(
      
      visits => {​​this.visits = visits;console.log(this.visits)}​​);
  }

  getDoctorName(key: String): String{
    for(let doctor of this.doctors){
      if(doctor.key === key){
        return "dr. " + doctor.firstname + " " + doctor.lastname;
      }
    }

    return "dr.";
  }

  getPacientName(key: String): String{
    for(let patient of this.patients){
      if(patient.key === key){
        return patient.firstname + " " + patient.lastname;
      }
    }

    return "";
  }

}
