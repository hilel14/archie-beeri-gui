import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ArchieDocumentService } from "../archie-document.service";
import { ImportAttributes } from "../model/import-attributes";


@Component({
  selector: "app-import-folder",
  templateUrl: "./import-folder.component.html",
  styleUrls: ["./import-folder.component.css"]
})
export class ImportFolderComponent implements OnInit {
  folders: string[];
  importAttributes: ImportAttributes = new ImportAttributes();
  dcCreator: string;
  dcSubject: string;
  dcCollections: (string)[];

  constructor(
    private archieDocumentService: ArchieDocumentService,
    private router: Router) { }

  ngOnInit() {
    this.initFoldersList();
    this.getAllCollections();
  }

  initFoldersList(): void {
    this.archieDocumentService
      .getImportFolders()
      .subscribe((data: string[]) => (this.folders = data));
  }

  getAllCollections(): void {
    this.archieDocumentService
      .getAllCollections()
      .subscribe((data: any) => this.initCollectionsList(data));
  }

  initCollectionsList(data: any): void {
    let results = data["response"]["docs"];
    let collections: string[] = [];
    for (let i = 0; i < results.length; i++) {
      collections.push(results[i]["dcTitleString"]);
    }
    collections.sort();
    collections.unshift(undefined);
    this.dcCollections = collections;
  }

  initCollectionsList2(data: any): void {
    let facets = data["facet_counts"]["facet_fields"]["dcTitleString"];
    let collections: string[] = [];
    for (let i = 0; i < facets.length; i += 2) {
      collections.push(facets[i].trim());
    }
    collections.sort();
    collections.unshift(undefined);
    this.dcCollections = collections;
  }

  import(): void {
    // dc creators
    if (this.dcCreator) {
      this.importAttributes.dcCreators = [];
      this.importAttributes.dcCreators.push(this.dcCreator);
    }
    // dc subjects
    if (this.dcSubject) {
      this.importAttributes.dcSubjects = [];
      this.importAttributes.dcSubjects.push(this.dcSubject);
    }
    // post
    this.archieDocumentService
      .importFolder(this.importAttributes)
      .subscribe((data: any) => this.postImport(data));
  }
  postImport(data: any): void {
    console.log("postImportFolder: " + data);
    alert("הקבצים נשלחו לשרת לקליטה - לחצו אישור לצפייה בדוח");
    this.router.navigate(["/import-folder-report"]);
  }
}
