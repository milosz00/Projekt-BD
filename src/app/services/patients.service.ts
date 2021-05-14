import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

  getPatients(): Observable<any> {
    return this.db.list('patients').snapshotChanges();
  }

  createPatient(patient: Patient): void {
    this.auth.createUser(patient.email, "default", "patients", patient, false);
  }

  deletePatient(key: string): void {
    this.db.list('patients').remove(key);
  }

}
