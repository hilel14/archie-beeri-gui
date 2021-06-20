import { Observable, of } from 'rxjs';
import { AbstractReportsService } from '../abstract-reports-service';
import { ImportFolder, ImportFile } from "../../_model/import-folder-report";

export class MockReportsService implements AbstractReportsService {

    importFile: ImportFile = {
        "id": "file_101",
        "importFolderId": 1,
        "importTime": Date.now(),
        "fileName": "file_1",
        statusCode: 1,
        warningMessage: "הכל בסדר"
    };

    importFolder: ImportFolder = {
        "id": 1001,
        "folderName": "dogs",
        "fileCount": 1,
        "importTime": Date.now(),
        files: [this.importFile]
    };

    public getImportFoldersReport(): Observable<any> {
        return of([this.importFolder]);
    }

    public getImportFilesReport(folderId: string): Observable<any> {
        return of(this.importFolder);
    }
}