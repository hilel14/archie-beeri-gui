import { SelectOption } from "./select-option";

export interface SearchParams {
    searchTerm: string;
    searchTermModifier: string;
    searchInFields: string;
    dcTypeFilter?: string;
    dcCreatorFilter?: string;
    startDateFilter?: Date;
    endDateFilter?: Date;
    dcCollectionFilter?: string;
    firstRow: number;
    numberOfRows: number;
    sortField: string;
    sortOrder: string;
}