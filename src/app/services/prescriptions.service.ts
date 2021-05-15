import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {Prescription} from "../models/prescription"
@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {

  constructor(private db: AngularFireDatabase) { }

  getPrescriptions(){
    return this.db.list("prescriptions").valueChanges()
  }
  createPrescription(prescription: Prescription){
    this.db.list("prescriptions").push(prescription);

  }

}