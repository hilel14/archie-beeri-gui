import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params, ParamMap } from "@angular/router";
import { Location } from "@angular/common";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { saveAs } from 'file-saver';
import { stringify } from "@angular/compiler/src/util";
import { isNgTemplate } from "@angular/compiler";

import { SearchParams } from '../_model/search-params'
import { AbstractArchieDocService } from "../_services/abstract-archie-doc-service";
import { AbstractStorageService } from "../_services/abstract-storage-service";
import { AbstractUsersService } from "../_services/abstract-users-service";
import { StorageService } from "../_services/prod/storage.service";
import { RemarksDialogComponent } from "../remarks-dialog/remarks-dialog.component";
import { ArchieDoc } from "../_model/archie-doc";
import { SelectOption } from "../_model/select-option";


@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit {
  dataSource: ArchieDoc[] = [];
  searchParams: SearchParams;
  totalDocumentsFound: number = 0;
  searchQuery: string;
  highlighting: {};
  defaultNumberOfRows: number = 5;
  separator: string = ":::"

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public dialog: MatDialog,
    private archieDocumentService: AbstractArchieDocService,
    private usersService: AbstractUsersService,
    private storageService: AbstractStorageService
  ) { }

  ngOnInit() {

    this.initSearchParams();
    this.updateModelFromUrl();
    this.getSearchResults(this.searchParams);
  }


  initSearchParams() {
    this.searchParams = {
      searchTerm: "*",
      searchTermModifier: "any",
      searchInFields: undefined,
      firstRow: 1,
      numberOfRows: this.defaultNumberOfRows,
      sortField: "dcDate",
      sortOrder: "asc"
    };
  }

  getSearchResults(searchParams: SearchParams): void {
    this.searchParams = searchParams;
    this.updateUrlFromModel();
    this.buildSolrSearchQuery();
    this.archieDocumentService
      .getSearchResults(this.searchQuery, this.searchParams.firstRow, this.searchParams.numberOfRows, false)
      .subscribe((data: any) => this.processSearchResults(data));
  }

  getSearchResultsAsCsv(): void {
    this.buildSolrSearchQuery();
    this.archieDocumentService
      .getSearchResultsAsCsv(this.searchQuery, this.totalDocumentsFound)
      .subscribe((data: any) => this.exportSearchResults(data));
  }

  exportSearchResults(data: any) {
    const blob = new Blob([data], { type: 'text/plain' });
    saveAs(blob, "archie-search-results.csv");
  }

  updateModelFromUrl() {
    this.route.queryParamMap.subscribe((params: { [key: string]: any }) => {
      // search term
      if (params.get("q")) {
        let q: string[] = params.get("q").split(this.separator);
        if (q.length > 1) {
          this.searchParams.searchInFields = q[0];
          this.searchParams.searchTerm = q[1];
        } else {
          this.searchParams.searchInFields = undefined;
          this.searchParams.searchTerm = q[0];
        }
      } else {
        this.searchParams.searchTerm = "*";
      }
      // search term modifier
      if (params.get("searchTermModifier")) {
        this.searchParams.searchTermModifier = params.get("searchTermModifier");
      }
      // filters
      let fq: Array<string> = params.getAll("fq");
      if (fq) {
        for (let i = 0; i < fq.length; i++) {
          let parts: Array<string> = fq[i].split(this.separator);
          switch (parts[0]) {
            case "dcType":
              this.searchParams.dcTypeFilter = parts[1];
              break;
            case "dcCreator":
              this.searchParams.dcCreatorFilter = parts[1];
              break;
            case "startDate":
              this.searchParams.startDateFilter = new Date(parts[1]);
              break;
            case "endDate":
              this.searchParams.endDateFilter = new Date(parts[1]);
              break;
            case "dcIsPartOf":
              this.searchParams.dcCollectionFilter = parts[1];
              break;
            default:
              console.log("unknow fq param: " + parts[0]);
          }
        }
      }
      // sort field and order
      this.searchParams.sortField = params.get("sortField") ? params.get("sortField") : "dcDate";
      this.searchParams.sortOrder = params.get("sortOrder") ? params.get("sortOrder") : "asc";
      // first and number of rows
      this.searchParams.firstRow = params.get("firstRow") ? params.get("firstRow") : 1;
      this.searchParams.numberOfRows =
        params.get("numberOfRows")
          ? params.get("numberOfRows")
          : this.defaultNumberOfRows;
    });
  }

  updateUrlFromModel(): void {

    let queryParams: Params = {};
    // search term
    if (this.searchParams.searchInFields) {
      queryParams['q'] = this.searchParams.searchInFields + this.separator + this.searchParams.searchTerm;
    } else {
      queryParams['q'] = this.searchParams.searchTerm;
    }
    // search term modifier
    if (this.searchParams.searchTermModifier) {
      queryParams['searchTermModifier'] = this.searchParams.searchTermModifier;
    }
    // filter query params
    let fq: Array<string> = [];
    if (this.searchParams.dcTypeFilter) {
      fq.push("dcType" + this.separator + this.searchParams.dcTypeFilter);
    }
    if (this.searchParams.dcCreatorFilter) {
      fq.push("dcCreator" + this.separator + this.searchParams.dcCreatorFilter);
    }
    if (this.searchParams.startDateFilter) {
      fq.push("startDate" + this.separator + this.formatDcDate(this.searchParams.startDateFilter, false));
    }
    if (this.searchParams.endDateFilter) {
      fq.push("endDate" + this.separator + this.formatDcDate(this.searchParams.endDateFilter, false));
    }
    if (this.searchParams.dcCollectionFilter) {
      fq.push("dcIsPartOf" + this.separator + this.searchParams.dcCollectionFilter);
    }
    if (fq.length > 0) {
      queryParams['fq'] = fq;
    }
    // sort field and order
    queryParams['sortField'] = this.searchParams.sortField;
    queryParams['sortOrder'] = this.searchParams.sortOrder;
    // first and number of rows
    queryParams['firstRow'] = this.searchParams.firstRow;
    queryParams['numberOfRows'] = this.searchParams.numberOfRows;
    // update browser address bar
    console.log(queryParams);
    this.router.navigate(["/search"], { queryParams: queryParams });
  }

  buildSolrSearchQuery(): void {
    // search term
    let q = "";
    this.searchParams.searchTerm = this.searchParams.searchTerm.trim();
    let userInput = this.searchParams.searchTerm ? this.escapeQueryChars(this.searchParams.searchTerm) : "*";
    // search term modifier
    if (userInput === "*") {
      q = "*"
    } else {
      switch (this.searchParams.searchTermModifier) {
        case "fuzzy":
          q = userInput + "~";
          break;
        case "exact":
          q = "\"" + userInput + "\"";
          break;
        case "any":
          q = userInput.split(" ").join(" AND ");
          break;
        case "start":
          q = userInput + "*";
          break;
        case "end":
          q = "*" + userInput;
          break;
        default:
          console.log("Unknown term modifier: " + this.searchParams.searchTermModifier);
      }
    }
    // search in fields
    this.searchQuery = this.searchParams.searchInFields ? "q=" + this.searchParams.searchInFields + ":" + q : "q=" + q;
    // dcType filter to search query
    if (this.searchParams.dcTypeFilter) {
      this.searchQuery += "&fq=dcType:" + this.searchParams.dcTypeFilter;
    } else {
      this.searchQuery += "&fq=!dcType:collection";
    }
    // dcCreator filter
    if (this.searchParams.dcCreatorFilter) {
      this.searchQuery += "&fq=dcCreator:" + '"' + this.escapeQueryChars(this.searchParams.dcCreatorFilter) + '"';
    }
    // collection filter
    if (this.searchParams.dcCollectionFilter) {
      // https://stackoverflow.com/questions/10023133/solr-wildcard-query-with-whitespace
      this.searchQuery += "&fq=dcIsPartOf:" + this.searchParams.dcCollectionFilter.split(" ").join("\\ ") + "*";
    }
    // date filters
    this.addDateFilters();
    // sort field
    switch (this.searchParams.sortField) {
      case "dcTitle":
        this.searchQuery += "&sort=dcTitleString " + this.searchParams.sortOrder + ",importTime asc,id asc";
        break;
      case "dcDate":
        this.searchQuery += "&sort=dcDate " + this.searchParams.sortOrder + ",importTime asc,id asc";
        break;
      case "importTime":
        this.searchQuery += "&sort=importTime " + this.searchParams.sortOrder + ",id asc";
        break;
      default:
        console.log("unknown sort field " + this.searchParams.sortField);
    }
  }

  addDateFilters(): void {
    if (this.searchParams.startDateFilter == undefined && this.searchParams.endDateFilter == undefined) {
      return;
    }
    let startDate: Date;
    if (this.searchParams.startDateFilter == undefined) {
      startDate = new Date();
      startDate.setFullYear(0);
    } else {
      startDate = this.searchParams.startDateFilter;
    }
    let endDate: Date =
      this.searchParams.endDateFilter == undefined ? new Date() : this.searchParams.endDateFilter;
    let q =
      "&fq=dcDate:" +
      "[" +
      this.formatDcDate(startDate, true) +
      " TO " +
      this.formatDcDate(endDate, true) +
      "]";
    this.searchQuery += q;
  }

  formatDcDate(date: Date, addTime: boolean): string {
    let d =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate();
    if (addTime) {
      d += "T00:00:00Z";
    }
    return d;
  }

  processSearchResults(data: any) {
    this.dataSource = data["response"]["docs"];
    this.totalDocumentsFound = data["response"]["numFound"];
    this.highlighting = data["highlighting"];
  }

  deleteDocument(doc: ArchieDoc): void {
    if (confirm("למחוק את " + doc.dcTitle + "?")) {
      this.archieDocumentService
        .deleteDocument(doc.id)
        .subscribe((data: any) => this.getSearchResults(this.searchParams));
    }
  }

  getDownloadLink(element: ArchieDoc) {
    return this.storageService.getUrl(element.dcAccessRights, "originals", element.id, element.dcFormat);
  }

  getPreviewTag(element: ArchieDoc): string {
    switch (element.dcFormat) {
      case "pdf":
      case "jpg":
      case "jpeg":
      case "tif":
      case "tiff":
      case "png":
        return "img";
      case "ogg":
      case "wav":
      case "mp3":
        return "audio";
      case "ogv":
      case "mov":
      case "avi":
      case "mpeg":
      case "mp4":
        return "video";
      default:
        return "unsupported";
    }
  }


  getThumbnailLink(element: ArchieDoc) {
    switch (this.getPreviewTag(element)) {
      case "img":
        return this.storageService.getUrl(element.dcAccessRights, "thumbnails", element.id, "png");
      case "audio":
      case "video":
        return (
          this.getDownloadLink(element)
        );
      default:
        return undefined;
    }
  }

  /*
  getDcTypeLabel(dcType: string): string {
    let dcTypeObjects: SelectOption[] = this.dcTypes.filter(item => item.value === dcType);
    if (dcTypeObjects.length > 0) {
      return dcTypeObjects[0].viewValue;
    } else {
      console.log("unknown dcType: " + dcType);
      return "?";
    }
  }
  */

  getHighlighting(id: string, fieldName: string) {
    return this.highlighting[id][fieldName];
  }

  searchParamsChanged() {
    this.searchParams.firstRow = 1;
    this.getSearchResults(this.searchParams);
  }

  hasPermission(roles: string[]): boolean {
    return this.usersService.hasPermission(roles);
  }

  escapeQueryChars(text: string): string {
    /*
    Solr query special characters
    + - && || ! ( ) { } [ ] ^ " ~ * ? : \ / 
    Example:
    (1+1):2
     \(1\+1\)\:2
     Javascript escape character \ needs to be escated to \\
    */
    let chars: Array<string> = ['+', '-', '&&', '||', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '\\', '/'];
    chars.forEach((s: string) => {
      text = text.replace(/s/g, "\\" + s);
    });
    return text;
  }

  openDialog(doc: ArchieDoc): void {
    const dialogRef = this.dialog.open(RemarksDialogComponent, {
      height: '400px',
      width: '600px',
      data: { id: doc.id, title: doc.dcTitle }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.archieDocumentService.addRemarks(result)
          .subscribe((data: any) => console.debug("Adding remarks to " + result.id));
      }
    });
  }

}
