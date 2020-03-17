import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ArchieDocumentService } from "../archie-document.service";
import { ArchieDoc } from "../model/archie-doc";
import { UsersService } from "../users.service";


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
    private usersService: UsersService,
    private archieDocumentService: ArchieDocumentService
  ) { }

  ngOnInit() {
    this.getDocDetails();
  }

  getDocDetails(): void {
    const dcTitle = '"' + this.route.snapshot.paramMap.get("dcTitle") + '"';
    console.log(dcTitle);
    this.archieDocumentService
      .getSearchResults("q=dcType:collection&fq=dcTitleString:" + dcTitle, 0, 1)
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
