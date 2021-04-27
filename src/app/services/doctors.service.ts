import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private db: AngularFireDatabase) { }




  createDoctor(doctor: Doctor) {
    this.db.list('doctors').push(doctor);
  }
}
