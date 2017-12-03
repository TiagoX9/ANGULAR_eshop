import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import * as firebase from 'firebase'; 

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,  // services have to be added here in constructor to be used
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) { // extract the return url param
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/' // when login return to the url they were otherwise to homepage
    localStorage.setItem('returnUrl', returnUrl); // saves the return url in local storage
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$() : Observable<AppUser> { // this observable returns the AppUser objects
    return this.user$
    // does mapping and switches tho the new observable below
      .switchMap(user => {  // this user object is the firebase one | located in user.service
       if (user) {
        return this.userService.get(user.uid);
       } else {
         return Observable.of(null); 
       }    
    }); 
  }
}
