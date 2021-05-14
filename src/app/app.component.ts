import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  collapsed = true;
  loginState = null;
  isAdmin = false;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.loginState = this.auth.getState().subscribe(user => {
      if(user){
        this.loginState = true;
        if(user.email === 'admin@admin.com')
          this.isAdmin = true;
      }
      else{
        this.loginState = false;
        this.isAdmin = false;
      }
    })
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  logOut() {
    this.auth.logOut();
  }
}
