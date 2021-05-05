import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { }

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
      this.router.navigate(['/home']);
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
}
