import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private db: AngularFireDatabase) { }


  createPatient(patient: Patient) {
    this.db.list("patients").push(patient);
  }
}
