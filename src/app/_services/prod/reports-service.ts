import { Injectable } from "@angular/core";
//import { ActivatedRoute } from "@angular/router";
//import { Location } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { AbstractReportsService } from '../abstract-reports-service';
import { environment } from '../../../environments/environment';
//import { ArchieDoc } from "../../model/archie-doc";
//import { ImportAttributes } from "../../model/import-attributes";
//import { Remarks } from "../../model/remarks";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})

export class ReportsService implements AbstractReportsService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.locationOrigin + "/rest";
  }

  getImportFoldersReport(): Observable<any> {
    let url = this.apiUrl + "/reports/import-folders";
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError("getImportFoldersReport", [])));
  }

  getImportFilesReport(folderId: string): Observable<any> {
    let url = this.apiUrl + "/reports/import-folder/" + folderId;
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError("getImportFoldersReport", [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}