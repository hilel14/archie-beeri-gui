import { Observable } from 'rxjs';
import { AbstractReportsService } from '../abstract-reports-service';

export class MockReportsService implements AbstractReportsService {
    public getImportFoldersReport(): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public getImportFilesReport(folderId: string): Observable<any> {
        throw new Error('Method not implemented.');
    }
}