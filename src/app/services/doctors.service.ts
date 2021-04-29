import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private db: AngularFireDatabase) { }


  getDoctors(): Observable<any> {
    return this.db.list('doctors').snapshotChanges();
  }

  createDoctor(doctor: Doctor) {
    this.db.list('doctors').push(doctor);
  }

  deleteDoctor(key: string): void {
    this.db.list('doctors').remove(key);
  }
}
