import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AbstractArchieDocService } from "../_services/abstract-archie-doc-service";
import { ArchieDoc } from "../_model/archie-doc";
import { AbstractUsersService } from "../_services/abstract-users-service";


@Component({
  selector: "app-dc-collection",
  templateUrl: "./dc-collection.component.html",
  styleUrls: ["./dc-collection.component.css"]
})
export class DcCollectionComponent implements OnInit {
  doc: ArchieDoc;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private usersService: AbstractUsersService,
    private archieDocumentService: AbstractArchieDocService
  ) { }

  ngOnInit() {
    this.getDocDetails();
  }

  getDocDetails(): void {
    const dcTitle = '"' + this.route.snapshot.paramMap.get("dcTitle") + '"';
    this.archieDocumentService
      .getSearchResults("q=dcType:collection&fq=dcTitleString:" + dcTitle, 1, 1, false)
      .subscribe((data: any) => this.processSearchResults(data));
  }

  processSearchResults(data: any) {
    if (data["response"]) {
      if (data["response"].numFound !== 1) {
        console.log("Warning: " + data["response"].numFound + " documents found - should be exatcly 1");
      }
      this.doc = data["response"]["docs"][0];
    }
  }
  searchDocuments(): void {
    this.router.navigate(["/search"], { queryParams: { q: "*", fq: ["dcIsPartOf:" + this.doc.dcTitle] } });
  }

  goBack(): void {
    this.location.back();
  }
}
