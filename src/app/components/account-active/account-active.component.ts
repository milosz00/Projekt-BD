import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-active',
  templateUrl: './account-active.component.html',
  styleUrls: ['./account-active.component.css']
})
export class AccountActiveComponent implements OnInit {

  password = ''; 
  password_repeat = ''; 

  alertVisible = false;
  errorInfo = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }


  onUpdatePassword(): void {
    if(!this.validatePassword())
      return;
    var email = this.auth.getCurrentUserEmail();
    this.auth.changePassword(email, this.password);
  }

  hideAlert(): void{
    this.alertVisible = false;
  }

  validatePassword(): boolean {
    if(this.password !== this.password_repeat ) {
      this.alertVisible = true;
      this.errorInfo = "Passwords are not the same!";
      return false;
    } else if (this.password.length < 6) {
      this.alertVisible = true;
      this.errorInfo = "Password must be longer!";
      return false;
    } else {
      this.alertVisible = false;
    }
    return true;
  }

}
