import { forwardRef } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ArchieDoc } from "../_model/archie-doc";
import { MockArchieDocService } from "./dev/mock-archie-doc-service";
import { ImportAttributes } from "../_model/import-attributes";
import { Remarks } from "../_model/remarks";

@Injectable({
    providedIn: "root"
    //useClass: forwardRef(() => MockArchieDocService) // Default implementation.
})
export abstract class AbstractArchieDocService {
    public abstract getDcTypes(): Observable<any>;
    public abstract getDcCreators(): Observable<any>;
    public abstract getAllCollections(): Observable<any>;
    public abstract getImportFolders(): Observable<any>;
    public abstract getSearchResults(searchParams: string, start: number, rows: number, content: boolean): Observable<any>;
    public abstract getSearchResultsAsCsv(searchParams: string, totalDocumentsFound: number): Observable<any>;
    public abstract updateDocument(id: string, record: any): Observable<any>;
    public abstract importFolder(importAttributes: ImportAttributes): Observable<any>;
    public abstract deleteDocument(id: string): Observable<any>;
    public abstract addRemarks(remakrs: Remarks): Observable<any>;
}
