import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from "../_model/user";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const item = localStorage.getItem('archieUser');
    if (item) {
      const user: User = JSON.parse(item);
      if (jwtHelper.isTokenExpired(user.token)) {
        console.log("Token expired at " + jwtHelper.getTokenExpirationDate(user.token));
      } else {
        if (jwtHelper.decodeToken(user.token).sub === expectedRole) {
          return true;
        }
      }
    }
    this.router.navigate(['login']);
    return false;
  }

}
