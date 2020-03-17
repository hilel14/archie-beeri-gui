import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Credentials } from "./model/credentials";
import { User } from "./model/user";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private baseUrl: string;

  constructor(private router: Router, private http: HttpClient) {
    this.baseUrl = window.location.origin + "/api/rest/users/";
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

  storeUserDetails(user: User) {
    if (user) {
      localStorage.setItem("archieUser", JSON.stringify(user));
      this.router.navigate(["/welcome"]);
    }
  }

  hasPermission(role: string): boolean {
    if (localStorage.getItem("archieUser")) {
      let user = JSON.parse(localStorage.getItem("archieUser"));
      return user.role == role;
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
