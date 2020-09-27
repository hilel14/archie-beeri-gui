import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { ArchieDocumentService } from "../archie-document.service";
import { StorageService } from "../storage.service";
import { ArchieDoc } from "../model/archie-doc";

@Component({
  selector: "app-edit-document",
  templateUrl: "./edit-document.component.html",
  styleUrls: ["./edit-document.component.css"]
})
export class EditDocumentComponent implements OnInit {
  orig: ArchieDoc;
  doc: ArchieDoc;
  newCreator: string;
  newSubject: string;
  dcCollection: string;
  dcCollections: (string)[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private archieDocumentService: ArchieDocumentService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.getAllCollections();
    this.getDocDetails();
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

  getDocDetails(): void {
    const docId = this.route.snapshot.paramMap.get("docId");
    this.archieDocumentService
      .getSearchResults("q=id:" + docId, 1, 1, true)
      .subscribe((data: any) => this.processSearchResults(data));
  }

  processSearchResults(data: any) {
    this.doc = data["response"]["docs"][0];
    this.orig = JSON.parse(JSON.stringify(this.doc));
    if (this.doc.dcIsPartOf) {
      this.dcCollection = this.doc.dcIsPartOf.toString();
    }

  }

  addCreator() {
    if (this.doc.dcCreator === undefined) {
      this.doc.dcCreator = new Array();
    }
    this.doc.dcCreator.push(this.newCreator);
    this.newCreator = undefined;
  }

  trimCreator(i: number) {
    if (this.doc.dcCreator[i].trim().length === 0) {
      this.doc.dcCreator.splice(i, 1);
    }
  }

  addSubject() {
    if (this.doc.dcSubject === undefined) {
      this.doc.dcSubject = new Array();
    }
    this.doc.dcSubject.push(this.newSubject);
    this.newSubject = undefined;
  }

  trimSubject(i: number) {
    if (this.doc.dcSubject[i].trim().length === 0) {
      this.doc.dcSubject.splice(i, 1);
    }
  }

  trackByFn(index: any, item: any) {
    // Fix dynamic input field lose focus when input changes bug
    return index;
  }

  goBack(): void {
    this.location.back();
  }

  getThumbnailLink(doc: ArchieDoc) {
    return this.storageService.getUrl(doc.dcAccessRights, "thumbnails", doc.id, "png");
  }

  arraysEqual(array1: Array<string>, array2: Array<string>): boolean {
    if (!array1 && !array2) {
      return true;
    }
    if (!array1 || !array2) {
      return false;
    }
    if (array1.length != array2.length) {
      return false;
    }
    return array1.every(function (element, index) {
      return element === array2[index];
    });
  }

  saveDocument(): void {
    let record = {};
    // strings
    ["dcTitle", "dcDate", "dcType", "dcDescription", "storageLocation", "dcIsPartOf", "dcAccessRights"].forEach((field) => {
      if (this.doc[field] != this.orig[field]) {
        record[field] = this.doc[field];
      }
    });
    // arrays
    ["dcSubject", "dcCreator"].forEach((field) => {
      if (!this.arraysEqual(this.doc[field], this.orig[field])) {
        record[field] = this.doc[field];
      }
    });
    // special fields
    if (record["dcAccessRights"]) {
      record["dcFormat"] = this.doc.dcFormat;
    }
    // submit update
    console.log(record);
    this.archieDocumentService
      .updateDocument(this.doc.id, record)
      //.subscribe((data: any) => console.log(data));
      .subscribe(() => this.goBack());
  }
}
