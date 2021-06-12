import { Component, OnInit, Input } from "@angular/core";

import { AbstractArchieDocService } from "../services/abstract-archie-doc-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  dcTypes: (string | number)[];

  constructor(
    private archieDocumentService: AbstractArchieDocService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dcTypes = [];
    this.getSummary();
  }

  getSummary(): void {
    this.archieDocumentService
      .getDcTypes()
      .subscribe(
        (data: any) =>
          (this.dcTypes = data["facet_counts"]["facet_fields"]["dcType"])
      );
  }

  getDcTypeCount(dcType: string): number {
    for (var i = 0; i < this.dcTypes.length; i += 2) {
      if (this.dcTypes[i] === dcType) {
        return <number>this.dcTypes[i + 1];
      }
    }
    return 0;
  }

  search(searchTerm: string): void {
    //this.router.navigate(["/search/" + searchTerm]);
    this.router.navigate(["/search"], { queryParams: { q: searchTerm } });
  }
}
