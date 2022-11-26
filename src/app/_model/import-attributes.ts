export class ImportAttributes {
  // global attributes
  folderName: string;
  textAction: string; // recognize (ocr), extrat (pdf), skip
  addFileNamesTo: string;
  // solr document fields
  dcTitle: string;
  dcDate: string;
  dcCreators: string[];
  dcDescription: string;
  dcSubjects: string[];
  dcType: string;
  dcIsPartOf: string;
  storageLocation2: string;
  dcAccessRights: string;
}
