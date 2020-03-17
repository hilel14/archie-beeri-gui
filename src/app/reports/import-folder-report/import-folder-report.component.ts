import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { ArchieDocumentService } from "../../archie-document.service";

export interface ImportFolder {
  id: number;
  folderName: string;
  importTimeFormatted: string;
  importDateFormatted: string;
  fileCount: number;
}

@Component({
  selector: "app-import-folder-report",
  templateUrl: "./import-folder-report.component.html",
  styleUrls: ["./import-folder-report.component.css"]
})
export class ImportFolderReportComponent implements OnInit {
  importFolders: ImportFolder[];
  selectedFolder: ImportFolder;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private archieDocumentService: ArchieDocumentService
  ) { }

  ngOnInit() {
    this.getImportFolders();
  }

  getImportFolders(): void {
    this.archieDocumentService
      .getImportFoldersReport()
      .subscribe(
        (data: ImportFolder[]) => (this.importFolders = data)
      );
  }

}
