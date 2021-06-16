import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { Credentials } from "../../_model/credentials";
import { User } from "../../_model/user";
import { environment } from "src/environments/environment";
import { AbstractUsersService } from "../abstract-users-service";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UsersService implements AbstractUsersService {
  private baseUrl: string;

  constructor(private router: Router, private http: HttpClient, private authService: SocialAuthService) {
    this.baseUrl = environment.locationOrigin + "/api/rest/users/";
  }

  login(username: string, password: string) {
    let credentials = new Credentials();
    credentials.username = username;
    credentials.password = password;
    this.authenticate(credentials).subscribe((data: any) =>
      this.storeUserDetails(data)
    );
  }

  authenticate(credentials: Credentials): Observable<any> {
    let url = this.baseUrl + "authenticate";
    return this.http.post(url, credentials, httpOptions)
      .pipe(catchError(this.handleError("authenticate", [])));
  }

  googleLogin(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((socialUser: SocialUser) => {
      this.googleAuthenticate(socialUser).subscribe((data: any) =>
        this.storeUserDetails(data)
      );
    });
  }

  googleAuthenticate(socialUser: SocialUser): Observable<any> {
    let url = this.baseUrl + "authenticate-with-google";
    return this.http.post(url, socialUser, httpOptions)
      .pipe(catchError(this.handleError("googleAuthenticate", [])));
  }

  storeUserDetails(user: User) {
    if (user) {
      localStorage.setItem("archieUser", JSON.stringify(user));
      this.router.navigate(["/welcome"]);
    }
  }

  hasPermission(roles: string[]): boolean {
    if (localStorage.getItem("archieUser")) {
      let user = JSON.parse(localStorage.getItem("archieUser"));
      return roles.includes(user.role);
    }
    return false;
  }

  logout() {
    localStorage.removeItem("archieUser");
  }

  getCurrentUser(): User {
    if (localStorage.getItem("archieUser")) {
      return JSON.parse(localStorage.getItem("archieUser"));
    }
    return undefined;
  }

  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
