import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Visit } from '../models/visit';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  constructor(private db: AngularFireDatabase) { }

  getAllVisits(): Observable<any>{
    return this.db.list('visits').snapshotChanges();
  }

  getPatientVisits(patientKey: string): Observable<any>{
    return this.db.list('visits', ref => ref.orderByChild('patientKey').equalTo(patientKey)).snapshotChanges();
  }

  getFreeVisits(): Observable<any>{
    return this.getPatientVisits("");
  }

  createVisit(visit: Visit): void{
    this.db.list("visits").push(visit);
  }

  deleteVisit(key: string): void{
    this.db.list("visits").remove(key);
  }

  addPatientToVisit(visitKey: string, patientKey: string){
    this.db.list("visits").update(visitKey, {patientKey: patientKey});
  }

  deletePatientFromVisit(key: string): void {
    this.addPatientToVisit(key, "");
  }

  
}
