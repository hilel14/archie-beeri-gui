import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export abstract class AbstractReportsService {
    public abstract getImportFoldersReport(): Observable<any>;
    public abstract getImportFilesReport(folderId: string): Observable<any>;
}