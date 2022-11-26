import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SearchParams } from '../_model/search-params'
import { SelectOption } from '../_model/select-option'
import { AbstractArchieDocService } from "../_services/abstract-archie-doc-service";

@Component({
  selector: 'app-search-results-filters',
  templateUrl: './search-results-filters.component.html',
  styleUrls: ['./search-results-filters.component.css']
})
export class SearchResultsFiltersComponent implements OnInit {

  @Input() searchParams: SearchParams;
  @Output() searchParamsEmitter = new EventEmitter<SearchParams>();
  dcCreators: SelectOption[];
  dcCollections: SelectOption[];
  dcTypes: SelectOption[] = [];
  searchInFields: SelectOption[] = [];

  constructor(private archieDocumentService: AbstractArchieDocService) { }

  ngOnInit(): void {
    this.getCreators();
    this.getAllCollections();
    this.initSearchInFields();
    this.initDcTypeList();
  }

  initSearchInFields() {
    this.searchInFields.push({ value: undefined, viewValue: "שדות הטקסט הנפוצים" });
    this.searchInFields.push({ value: "dcTitle", viewValue: "הכותרת" });
    this.searchInFields.push({ value: "dcDescription", viewValue: "התיאור" });
    this.searchInFields.push({ value: "storageLocation2", viewValue: "המיקום" });
    this.searchInFields.push({ value: "id", viewValue: "מזהה רשומה" });
  }

  initDcTypeList() {
    this.dcTypes.push({ value: undefined, viewValue: "כל הסוגים" });
    this.dcTypes.push({ value: "text", viewValue: "טקסט" });
    this.dcTypes.push({ value: "image", viewValue: "תמונה" });
    this.dcTypes.push({ value: "audio", viewValue: "צליל" });
    this.dcTypes.push({ value: "video", viewValue: "סרטון" });
    this.dcTypes.push({ value: "other", viewValue: "אחר" });
  }

  getCreators(): void {
    this.archieDocumentService
      .getDcCreators()
      .subscribe((data: any) => this.initCreatorsList(data));
  }

  initCreatorsList(data: any): void {
    let facets = data["facet_counts"]["facet_fields"]["dcCreator"];
    let creators: SelectOption[] = [];
    for (let i = 0; i < facets.length; i += 2) {
      creators.push({ value: facets[i].trim(), viewValue: facets[i] });
    }
    //creators.sort();
    creators.unshift({ value: undefined, viewValue: "כולם" });
    this.dcCreators = creators;
  }

  getAllCollections(): void {
    this.archieDocumentService
      .getAllCollections()
      .subscribe((data: any) => this.initCollectionsList(data));
  }

  initCollectionsList(data: any): void {
    let results = data["response"]["docs"];
    let collections: SelectOption[] = [];
    for (let i = 0; i < results.length; i++) {
      collections.push({ value: results[i]["dcTitleString"], viewValue: results[i]["dcTitleString"] });
    }
    //collections.sort();
    collections.unshift({ value: undefined, viewValue: "כל האוספים" });
    this.dcCollections = collections;
  }

  resetStartDatePicker(event) {
    event.stopPropagation();
    this.searchParams.startDateFilter = null;
    //getSearchResults();
  }

  resetEndDatePicker(event) {
    event.stopPropagation();
    this.searchParams.endDateFilter = null;
    //getSearchResults();
  }


  searchParamsChanged() {
    this.searchParamsEmitter.emit(this.searchParams);
  }

}
