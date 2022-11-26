import { Observable, of } from 'rxjs';
import { AbstractArchieDocService } from '../abstract-archie-doc-service';
import { ArchieDoc } from '../../_model/archie-doc';
import { ImportAttributes } from '../../_model/import-attributes';
import { Remarks } from '../../_model/remarks';


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
    public getSearchResults(
        searchParams: string,
        start: number,
        rows: number,
        content: boolean
    ): Observable<any> {
        let results = {
            "response": {
                "numFound": 3, "start": 0, "docs": [
                    {
                        "id": "doc1",
                        "dcCreator": ["יוסף טרומפלדור", "יוסף סטלין"],
                        "dcDate": "2017-09-30T00:00:00Z",
                        "dcDescription": "סיפורם של 60 מחברי קיבוץ בארי",
                        "dcFormat": "pdf",
                        "dcTitle": "סיפורי חיים 2017 - הספר",
                        "importTime": "2018-08-07T12:44:19.052Z",
                        "storageLocation2": "ארון 6 מדף 2",
                        "dcAccessRights": "private",
                        "dcType": "text",
                        "dcIsPartOf": "כללי",
                        "dcSubject": ["חברים"]
                    },
                    {
                        "id": "doc2",
                        "importTime": "2020-07-07T16:17:49.643Z",
                        "dcAccessRights": "private",
                        "dcDate": "2020-05-28T21:00:00Z",
                        "dcFormat": "jpg",
                        "dcType": "image",
                        "dcTitle": "לוגו לאתר בארי - חשמליה - מיזוג",
                        "dcIsPartOf": "כללי",
                        "dcCreator": ["אבי רון"],
                        "dcDescription": "לוגואים שעוצבו לכבוד אתר האינטרנט החדש של קיבוץ בארי"
                    },
                    {
                        "id": "doc3",
                        "importTime": "2020-07-07T16:17:49.940Z",
                        "dcAccessRights": "private",
                        "dcDate": "2020-05-28T21:00:00Z",
                        "dcFormat": "jpg",
                        "dcType": "image",
                        "dcTitle": "טיול משפחות לכנרת",
                        "dcIsPartOf": "כללי",
                        "dcDescription": "עומדים מימין לשמאל: אברהם, יצחק, יעקב, שרה, קבל סתירה"
                    }
                ]
            },
            "highlighting": {
                "doc1": {},
                "doc2": {},
                "doc3": {}
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
