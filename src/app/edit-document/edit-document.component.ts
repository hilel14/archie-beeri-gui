import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { ArchieDocumentService } from "../archie-document.service";
import { ArchieDoc } from "../model/archie-doc";

@Component({
  selector: "app-edit-document",
  templateUrl: "./edit-document.component.html",
  styleUrls: ["./edit-document.component.css"]
})
export class EditDocumentComponent implements OnInit {
  doc: ArchieDoc;
  dcCreators: string;
  dcSubjects: string;
  dcCollection: string;
  dcCollections: (string)[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private archieDocumentService: ArchieDocumentService
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
      .getSearchResults("q=id:" + docId, 0, 1)
      .subscribe((data: any) => this.processSearchResults(data));
  }

  processSearchResults(data: any) {
    this.doc = data["response"]["docs"][0];
    if (this.doc.dcCreator) {
      this.dcCreators = this.doc.dcCreator.toString();
    }
    if (this.doc.dcSubject) {
      this.dcSubjects = this.doc.dcSubject.toString();
    }
    if (this.doc.dcIsPartOf) {
      this.dcCollection = this.doc.dcIsPartOf.toString();
    }
  }

  goBack(): void {
    this.location.back();
  }

  getPreviewLink(doc: ArchieDoc) {
    return "/assetstore/" + doc.dcAccessRights + "/preview/" + doc.id + ".png";
  }

  getDcTypes(): string[] {
    return ["text", "image", "audio", "video", "phisical-object", "collection"];
  }

  getAccessRights(): string[] {
    return ["public", "private", "secret"];
  }


  saveDocument(): void {
    // creators
    if (this.dcCreators) {
      this.doc.dcCreator = this.dcCreators.split(",");
    }
    // subjects
    if (this.dcSubjects) {
      this.doc.dcSubject = this.dcSubjects.split(",");
    }
    this.archieDocumentService
      .updateDocument(this.doc)
      //.subscribe((data: any) => console.log(data));
      .subscribe(() => this.goBack());
  }
}
