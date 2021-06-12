import { Observable, of } from 'rxjs';
import { AbstractArchieDocService } from '../abstract-archie-doc-service';
import { ArchieDoc } from '../../model/archie-doc';
import { ImportAttributes } from '../../model/import-attributes';
import { Remarks } from '../../model/remarks';


export class MockArchieDocService implements AbstractArchieDocService {
    public getDcTypes(): Observable<any> {
        let deTypes = {
            "facet_counts": {
                "facet_fields": {
                    "dcType": ["text", 1, "image", 2, "audio", 3, "video", 4, "other", 5]
                }
            },
        }
        return of(deTypes);
    }
    public getDcCreators(): Observable<any> {
        let deCreators = {
            "facet_counts": {
                "facet_fields": {
                    "dcCreator": ["c1", 1, "c2", 2, "c3", 3]
                }
            },
        }
        return of(deCreators);
    }
    public getAllCollections(): Observable<any> {
        let collections = {
            "response":
            {
                "numFound": 3,
                "start": 0,
                "docs": [
                    {
                        "dcTitleString": "נוהלים"
                    },
                    {
                        "dcTitleString": "כללי"
                    },
                    {
                        "dcTitleString": "מפות"
                    }
                ]
            }
        };
        return of(collections);
    }
    public getSearchResults(): Observable<any> {
        let results = {
            "response": {
                "numFound": 143452, "start": 0, "docs": [
                    {
                        "dcFormat": "pdf",
                        "id": "b788131a-e98b-4cc5-8066-509f1e4ec165"
                    },
                    {
                        "dcFormat": "jpg",
                        "id": "55414937-ab0a-486a-8744-58553c76f4ff"
                    }]
            },
            "highlighting": {
                "b788131a-e98b-4cc5-8066-509f1e4ec165": {},
                "55414937-ab0a-486a-8744-58553c76f4ff": {}
            }
        };
        return of(results);
    }

    public getSearchResultsAsCsv(searchParams: string, totalDocumentsFound: number): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public getImportFolders(): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public importFolder(importAttributes: ImportAttributes): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public updateDocument(id: string, record: any): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public deleteDocument(id: string): Observable<any> {
        throw new Error('Method not implemented.');
    }
    public addRemarks(remakrs: Remarks): Observable<any> {
        throw new Error('Method not implemented.');
    }

}
