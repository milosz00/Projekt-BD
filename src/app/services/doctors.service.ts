import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Doctor } from '../models/doctor';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }


  getDoctors(): Observable<any> {
    return this.db.list('doctors').snapshotChanges();
  }

  createDoctor(doctor: Doctor) {
    this.auth.createUser(doctor.email, "default", "doctors", doctor, false);
  }

  deleteDoctor(key: string): void {
    this.db.list('doctors').remove(key);
  }

  findDoctor(email: string): Observable<any> {
    return this.db.list('doctors', ref => ref.orderByChild("email").equalTo(email)).valueChanges();
  }
}
