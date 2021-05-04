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

  createUser(email: string, password: string, role: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(user => {
      const newUser: User = {
        uid: user.user.uid,
        email: user.user.email,
        role: role,
        active: true,
      }

      this.db.list('users').push(newUser);
      this.router.navigate(['/home']);
    })
  }
}
