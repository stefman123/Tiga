import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  profile: any;
  private roles: string[] = [];

  constructor(public auth:AuthService) {
    this.readUserFromLocalStorage();
    auth.isAuthenticated$.subscribe(auth => this.onUserAuthenticated(auth) )
   }

  private onUserAuthenticated(authResult) {
    localStorage.setItem('token', authResult.accessToken);

    this.auth.user$.subscribe( userProfile => {

    localStorage.setItem('profile', JSON.stringify(userProfile));
      this.readUserFromLocalStorage();
    })


  }


  private readUserFromLocalStorage() {
    this.profile = JSON.parse(localStorage.getItem('profile'));

    var token = localStorage.getItem('Token');
    if (token) {
      var jwtHelper = new JwtHelperService();
      var decodedToken = jwtHelper.decodeToken(token);
      this.roles = decodedToken['https://tiga.com/roles'] || [];
    }
  }

  public isInRole(roleName) {
    return this.roles.indexOf(roleName) > -1;
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.profile = null;
    this.roles = [];
    this.auth.logout();
  }


}
