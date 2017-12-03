import { AppUser } from '../models/app-user';
import { AuthService } from '../auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser;

  constructor(private auth: AuthService) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser); // This avoid infinite loop when the app loads and searches for users
  }

  logout() {
    this.auth.logout();
  }

}
