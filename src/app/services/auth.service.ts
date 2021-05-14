import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DbQueryService } from './db-query.service';
import { DoctorsService } from './doctors.service';
import { PatientsService } from './patients.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentEmail: string;
  currentUserRole: string;
  isAdminUser = false;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, private router: Router, private queryService: DbQueryService) { }

  createUser(email: string, password: string, role: string, newUser: any, active: boolean) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(user => {
      newUser.uid = user.user.uid;
      newUser.active = active;

      this.db.list(role).push(newUser);

      if(active === true) 
        this.router.navigate(['/home']);
    
    })
  }

  logIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password).then(()=>{
      this.currentEmail = email;
      if(email === "admin@admin.com") {
        this.isAdminUser = true;
        this.router.navigate(['/admin-panel']);
      } else {
        this.currentUserRole = 'doctor';

        this.queryService.findDoctorByEmail(email, "value").subscribe(x => {
          if(x.length > 0 && x[0].active === false) {
            this.router.navigate(['/active-account']);
          }
        })

        this.queryService.findPatientByEmail(email, "value").subscribe(x => {
          if(x.length > 0 && x[0].active === false) {
            this.router.navigate(['/active-account']);
          }
        })
        
        this.router.navigate(['/home']);
      }
    })
  }

  logOut(){
    this.auth.signOut().then(() => {
      this.router.navigate(['/sign-in']);
    })
  }

  getState() {
    return this.auth.authState;
  }

  getCurrentUserEmail(): string {
    return this.currentEmail;
  }

  isAdmin(): boolean {
    return this.isAdminUser;
  }

  changePassword(email: string, password: string) {
    this.auth.signOut();
    this.auth.signInWithEmailAndPassword(email, "default").then(()=>{
      var user = this.auth.currentUser.then(x => {x.delete()});
      this.auth.createUserWithEmailAndPassword(email, password).then(()=> {
        this.modifyActiveDoctor(email);
        this.modifyActivePatient(email);
      })
    })
  }

  private modifyActiveDoctor(email: string) {
    this.queryService.findDoctorByEmail(email, "snapshot").pipe(

      map(changes =>
      
      changes.map(c =>
      
      ({​​ key: c.payload.key, ...c.payload.val() }​​)
      
      ))
      
      ).subscribe(x => {
        ​​if(x.length > 0) {
          this.queryService.changeToActive(x[0].key, "doctors");
          this.router.navigate(['/home']);
        }
      }​​);
  }

  private modifyActivePatient(email: string) {
    this.queryService.findPatientByEmail(email, "snapshot").pipe(

      map(changes =>
      
      changes.map(c =>
      
      ({​​ key: c.payload.key, ...c.payload.val() }​​)
      
      ))
      
      ).subscribe(x => {
        ​​if(x.length > 0) {
          this.queryService.changeToActive(x[0].key, "patients");
          this.router.navigate(['/home']);
        }
      }​​);
  }
}
