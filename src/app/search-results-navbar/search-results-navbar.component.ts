import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchParams } from "../_model/search-params";

@Component({
  selector: 'app-search-results-navbar',
  templateUrl: './search-results-navbar.component.html',
  styleUrls: ['./search-results-navbar.component.css']
})
export class SearchResultsNavbarComponent implements OnInit {

  @Input() searchParams: SearchParams;
  @Input() totalDocumentsFound: number;
  @Output() navParamsEmitter = new EventEmitter<SearchParams>();

  constructor() { }

  ngOnInit(): void { }

  nextPageDisabled(): boolean {
    return Number(this.searchParams.firstRow) + Number(this.searchParams.numberOfRows) > Number(this.totalDocumentsFound);
  }

  nextPage() {
    this.searchParams.firstRow = Number(this.searchParams.firstRow) + Number(this.searchParams.numberOfRows)
    this.navParamsEmitter.emit(this.searchParams);
  }

  previousPageDisabled(): boolean {
    return Number(this.searchParams.firstRow) - Number(this.searchParams.numberOfRows) <= 0;
  }

  previousPage() {
    this.searchParams.firstRow = Number(this.searchParams.firstRow) - Number(this.searchParams.numberOfRows)
    this.navParamsEmitter.emit(this.searchParams);
  }

  jumpToPage() {
    this.searchParams.firstRow = this.searchParams.firstRow > this.totalDocumentsFound ? this.totalDocumentsFound : this.searchParams.firstRow;
    this.navParamsEmitter.emit(this.searchParams);
  }

  navParamsChanged() {
    this.navParamsEmitter.emit(this.searchParams);
  }

}
