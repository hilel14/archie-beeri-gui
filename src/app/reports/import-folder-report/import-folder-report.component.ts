import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { AbstractReportsService } from "../../_services/abstract-reports-service";
import { ImportFolder } from "../../_model/import-folder-report";

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
    private reportsService: AbstractReportsService
  ) { }

  ngOnInit() {
    this.getImportFolders();
  }

  getImportFolders(): void {
    this.reportsService
      .getImportFoldersReport()
      .subscribe(
        (data: ImportFolder[]) => (this.importFolders = data)
      );
  }

}
