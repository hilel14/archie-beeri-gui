import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params, ParamMap } from "@angular/router";
import { Location } from "@angular/common";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { saveAs } from 'file-saver';

import { ArchieDocumentService } from "../archie-document.service";
import { ArchieDoc } from "../model/archie-doc";
import { UsersService } from "../users.service";
import { stringify } from "@angular/compiler/src/util";
import { isNgTemplate } from "@angular/compiler";

export interface SelectOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit {
  dataSource: ArchieDoc[] = [];
  totalDocumentsFound: number = 0;
  firstRow: number = 0;
  defaultNumberOfRows = 1;
  numberOfRows: number = this.defaultNumberOfRows;
  searchBox: string;
  searchQuery: string;
  dcCreators: (string)[];
  dcCreatorFilter: string;
  dcTypes: SelectOption[];
  dcTypeFilter: string;
  startDateFilter: Date;
  endDateFilter: Date;
  sortFields: SelectOption[];
  dcSubject: string;
  dcCollectionFilter: string;
  dcCollections: (string)[];
  dcTitleString: string;
  sortField: string = "dcDate";
  sortOrder: string = "asc";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private archieDocumentService: ArchieDocumentService,
    private usersService: UsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.initSortControls();
    this.initDcTypeList();
    this.getCreators();
    this.getAllCollections();
    this.updateModelFromUrl();
    this.getSearchResults();
  }

  initSortControls(): void {
    this.sortFields = [
      { value: "dcDate", viewValue: "תאריך" },
      { value: "dcTitle", viewValue: "כותרת" },
      { value: "importTime", viewValue: "קליטה" }
    ];
  }

  initDcTypeList(): void {
    this.dcTypes = [
      { value: undefined, viewValue: "" },
      { value: "text", viewValue: "טקסט" },
      { value: "image", viewValue: "תמונה" },
      { value: "audio", viewValue: "צליל" },
      { value: "video", viewValue: "סרטון" },
      { value: "other", viewValue: "אחר" }
      //"collection"
    ];
  }

  getCreators(): void {
    this.archieDocumentService
      .getDcCreators()
      .subscribe((data: any) => this.initCreatorsList(data));
  }

  getAllCollections(): void {
    this.archieDocumentService
      .getAllCollections()
      .subscribe((data: any) => this.initCollectionsList(data));
  }

  initCreatorsList(data: any): void {
    let facets = data["facet_counts"]["facet_fields"]["dcCreator"];
    let creators: string[] = [];
    for (let i = 0; i < facets.length; i += 2) {
      creators.push(facets[i].trim());
    }
    creators.sort();
    creators.unshift(undefined);
    this.dcCreators = creators;
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

  resetStartDatePicker(event) {
    event.stopPropagation();
    this.startDateFilter = null;
    this.getSearchResults();
  }

  resetEndDatePicker(event) {
    event.stopPropagation();
    this.endDateFilter = null;
    this.getSearchResults();
  }

  getSearchResults(): void {
    this.updateUrlFromModel();
    this.buildSolrSearchQuery();
    this.archieDocumentService
      .getSearchResults(this.searchQuery, this.firstRow, this.numberOfRows)
      .subscribe((data: any) => this.processSearchResults(data));
  }

  getSearchResultsAsCsv(): void {
    this.buildSolrSearchQuery();
    this.archieDocumentService
      .getSearchResultsAsCsv(this.searchQuery)
      .subscribe((data: any) => this.exportSearchResults(data));
  }

  exportSearchResults(data: any) {
    //console.log(data);
    const blob = new Blob([data], { type: 'text/plain' });
    saveAs(blob, "archie-search-results.csv");
  }

  updateModelFromUrl() {
    this.route.queryParamMap.subscribe((params: { [key: string]: any }) => {
      //console.log("updateModelFromUrl " + JSON.stringify(params));
      // search term
      this.searchBox = params.get("q");
      if (!this.searchBox) {
        this.searchBox = "*";
      }
      // filters
      let fq: Array<string> = params.getAll("fq");
      if (fq) {
        for (let i = 0; i < fq.length; i++) {
          let parts: Array<string> = fq[i].split(":");
          switch (parts[0]) {
            case "dcType":
              this.dcTypeFilter = parts[1];
              break;
            case "dcCreator":
              this.dcCreatorFilter = parts[1];
              break;
            case "startDate":
              this.startDateFilter = new Date(parts[1]);
              break;
            case "endDate":
              this.endDateFilter = new Date(parts[1]);
              break;
            case "dcTitleString":
              this.dcTitleString = parts[1];
              break;
            case "dcIsPartOf":
              this.dcCollectionFilter = parts[1];
              break;
            default:
              console.log("unknow fq param: " + parts[0]);
          }
        }
      }
      // sort field and order
      this.sortField = params.get("sortField") ? params.get("sortField") : "dcDate";
      this.sortOrder = params.get("sortOrder") ? params.get("sortOrder") : "asc";
      // first and number of rows
      this.firstRow = params.get("firstRow") ? params.get("firstRow") : 0;
      this.numberOfRows =
        params.get("numberOfRows")
          ? params.get("numberOfRows")
          : this.defaultNumberOfRows;
    });
  }

  updateUrlFromModel(): void {
    let queryParams: Params = {};
    // search term
    queryParams['q'] = this.searchBox;
    // filter query params
    let fq: Array<string> = [];
    if (this.dcTypeFilter) {
      fq.push("dcType:" + this.dcTypeFilter);
    }
    if (this.dcCreatorFilter) {
      fq.push("dcCreator:" + this.dcCreatorFilter);
    }
    if (this.startDateFilter) {
      fq.push("startDate:" + this.formatDcDate(this.startDateFilter, false));
    }
    if (this.endDateFilter) {
      fq.push("endDate:" + this.formatDcDate(this.endDateFilter, false));
    }
    if (this.dcTitleString) {
      fq.push("dcTitleString:" + this.dcTitleString);
    }
    if (this.dcCollectionFilter) {
      fq.push("dcIsPartOf:" + this.dcCollectionFilter);
    }
    if (fq.length > 0) {
      queryParams['fq'] = fq;
    }
    // sort field and order
    queryParams['sortField'] = this.sortField;
    queryParams['sortOrder'] = this.sortOrder;
    // first and number of rows
    queryParams['firstRow'] = this.firstRow;
    queryParams['numberOfRows'] = this.numberOfRows;
    // update browser address bar
    this.router.navigate(["/search"], { queryParams: queryParams });
  }

  buildSolrSearchQuery(): void {
    // main search term
    this.searchQuery = "q=" + this.searchBox;
    // Add dcType filter to search query
    if (this.dcTypeFilter) {
      this.searchQuery += "&fq=dcType:" + this.dcTypeFilter;
    }
    // Add dcCreator filter
    if (this.dcCreatorFilter) {
      this.searchQuery += "&fq=dcCreator:" + '"' + this.dcCreatorFilter + '"';
    } else {
      this.searchQuery += "&fq=!dcType:collection";
    }
    // dcTitle
    if (this.dcTitleString) {
      this.searchQuery += "&fq=dcTitleString:" + '"' + this.dcTitleString + '"';
    }
    // collection
    if (this.dcCollectionFilter) {
      // https://stackoverflow.com/questions/10023133/solr-wildcard-query-with-whitespace
      this.searchQuery += "&fq=dcIsPartOf:" + this.dcCollectionFilter.split(" ").join("\\ ") + "*";
    }
    // add date filters
    this.addDateFilters();
    // add sort field
    switch (this.sortField) {
      case "dcTitle":
        this.searchQuery += "&sort=dcTitleString " + this.sortOrder + ",importTime asc,id asc";
        break;
      case "dcDate":
        this.searchQuery += "&sort=dcDate " + this.sortOrder + ",importTime asc,id asc";
        break;
      case "importTime":
        this.searchQuery += "&sort=importTime " + this.sortOrder + ",id asc";
        break;
      default:
        // this.searchQuery += "&sort=" + this.sortField + " " + this.sortOrder;
        console.log("unknown sort field " + this.sortField);
    }
  }

  addDateFilters(): void {
    if (this.startDateFilter == undefined && this.endDateFilter == undefined) {
      return;
    }
    let startDate: Date;
    if (this.startDateFilter == undefined) {
      startDate = new Date();
      startDate.setFullYear(0);
    } else {
      startDate = this.startDateFilter;
    }
    let endDate: Date =
      this.endDateFilter == undefined ? new Date() : this.endDateFilter;
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
    this.totalDocumentsFound = +data["response"]["numFound"];
  }

  deleteDocument(doc: ArchieDoc): void {
    if (confirm("למחוק את " + doc.dcTitle + "?")) {
      this.archieDocumentService
        .deleteDocument(doc.id)
        .subscribe((data: any) => this.getSearchResults());
    }
  }

  getDownloadLink(element: ArchieDoc) {
    return "/assetstore/" + element.dcAccessRights + "/assets/" + element.id + "." + element.dcFormat;
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


  getPreviewLink(element: ArchieDoc) {
    //console.log("getPreviewLink " + this.getPreviewTag(element.dcFormat));
    switch (this.getPreviewTag(element)) {
      case "img":
        return "/assetstore/" + element.dcAccessRights + "/preview/" + element.id + ".png";
      case "audio":
      case "video":
        return (
          "/assetstore/" + element.dcAccessRights + "/assets/" + element.id + "." + element.dcFormat
        );
      default:
        return undefined;
    }
  }

  getDcTypeLabel(dcType: string): string {
    let dcTypeObjects: SelectOption[] = this.dcTypes.filter(item => item.value === dcType);
    if (dcTypeObjects.length > 0) {
      return dcTypeObjects[0].viewValue;
    } else {
      console.log("unknown dcType: " + dcType);
      return "?";
    }
  }

  onPaginateChange(event) {
    //alert(JSON.stringify("Current page index: " + event.pageIndex));
    this.firstRow = event.pageIndex * event.pageSize;
    this.numberOfRows = event.pageSize;
    this.getSearchResults();
  }

}
