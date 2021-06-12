import { Observable } from 'rxjs';
import { AbstractArchieDocService } from '../abstract-archie-doc-service';
import { ArchieDoc } from '../../model/archie-doc';
import { ImportAttributes } from '../../model/import-attributes';
import { Remarks } from '../../model/remarks';


export class MockArchieDocService implements AbstractArchieDocService {
    public getDcTypes(): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public getDcCreators(): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public getAllCollections(): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public getImportFolders(): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public getSearchResultsAsCsv(searchParams: string, totalDocumentsFound: number): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public updateDocument(id: string, record: any): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public importFolder(importAttributes: ImportAttributes): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public deleteDocument(id: string): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public addRemarks(remakrs: Remarks): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public getSearchResults(): Observable<ArchieDoc[]> {
        throw new Error('Method not implemented.');
    }
}
