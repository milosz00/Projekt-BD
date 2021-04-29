import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private db: AngularFireDatabase) { }

  getPatients(): Observable<any> {
    return this.db.list('patients').snapshotChanges();
  }

  createPatient(patient: Patient): void {
    this.db.list("patients").push(patient);
  }

  deletePatient(key: string): void {
    this.db.list('patients').remove(key);
  }
}
