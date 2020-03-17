import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //constructor(public jwtHelper: JwtHelperService) { }


  public isAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService();
    const item = localStorage.getItem('archieUser');
    if (item) {
      let user: User = JSON.parse(item);
      //return !this.jwtHelper.isTokenExpired(user.token);
      return !jwtHelper.isTokenExpired(user.token);
    }
    return false;
  }

}
