import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { AbstractReportsService } from "../../_services/abstract-reports-service";
import { ImportFolder, ImportFile } from "../../_model/import-folder-report";

/*
export interface ImportFile {
  id: string;
  importFolderId: number;
  importDateFormatted: string;
  importTimeFormatted: string;
  fileName: string;
  statusCode: number;
  warningMessage: string;
}

export interface ImportFolder {
  id: number;
  folderName: String;
  fileCount: number;
  importTime: Date;
  files: ImportFile[];
}
*/

export interface StatusSummary {
  started: number;
  imported: number;
  rejected: number;
  inProgress: number;
}

@Component({
  selector: "app-import-file-report",
  templateUrl: "./import-file-report.component.html",
  styleUrls: ["./import-file-report.component.css"]
})
export class ImportFileReportComponent implements OnInit {

  importFolder: ImportFolder;
  statusSummary: StatusSummary;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private reportsService: AbstractReportsService
  ) { }

  ngOnInit() {
    this.getImportFiles();
  }

  getImportFiles(): void {
    const folderId = this.route.snapshot.paramMap.get("folderId");
    this.reportsService
      .getImportFilesReport(folderId)
      .subscribe(
        (data: ImportFolder) => (this.processResults(data))
      );
  }

  processResults(data: ImportFolder): void {
    this.importFolder = data;
    this.statusSummary = {
      started: this.importFolder.files.length,
      imported: 0,
      rejected: 0,
      inProgress: 0
    };
    this.importFolder.files.forEach((importFile: ImportFile) => {
      switch (importFile.statusCode) {
        case -1:
          this.statusSummary.rejected += 1;
          break;
        case 0:
          this.statusSummary.inProgress += 1;
          break;
        case 1:
          this.statusSummary.imported += 1;
          break;
        default:
          console.log("unknown status code: " + importFile.statusCode);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

}
