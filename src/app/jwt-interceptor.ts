// https://github.com/mainawycliffe/refreshing-authorization-token-angular-6

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let user = JSON.parse(localStorage.getItem("archieUser"));
    if (user && user.token) {
      request = request.clone({
        setHeaders: {
          Authorization: user.token
        }
      });
    }
    return next.handle(request).pipe(
      catchError(error => {
        console.log("jwt interceptor error: " + error );
        if (error.status === 500) {
          this.router.navigate(['login']);
        }
        return throwError(error);
      }
      ));
  }

}