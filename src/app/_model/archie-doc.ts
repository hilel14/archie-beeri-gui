export interface ArchieDoc {
  id: string;
  dcTitle: string;
  dcDate?: string;
  dcCreator?: Array<string>;
  dcDescription?: string;
  dcSubject?: Array<string>;
  storageLocation?: string;
  dcFormat?: string;
  dcType: string;
  dcIsPartOf: string;
  dcAccessRights: string;
  importTime: string;
  sortCode?: number;
  content?: string;
  remarks?: string;
}
