import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbQueryService {

  constructor(private db: AngularFireDatabase) { }

  findPatientByEmail(email: string, type: string):Observable<any> {
    if(type === 'value')
      return this.db.list('patients', ref => ref.orderByChild("email").equalTo(email)).valueChanges();
    else if(type === 'snapshot')
      return this.db.list('patients', ref => ref.orderByChild("email").equalTo(email)).snapshotChanges();
  }

  findDoctorByEmail(email: string, type: string): Observable<any> {
    if(type === 'value')
      return this.db.list('doctors', ref => ref.orderByChild("email").equalTo(email)).valueChanges();
    else if(type === 'snapshot')
      return this.db.list('doctors', ref => ref.orderByChild("email").equalTo(email)).snapshotChanges();
  }

  changeToActive(key: string, role: string) {
    this.db.list(role).update(key, {active: true});
  }
}
