import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getUrl(dcAccessRights: string, assetType: string, id: string, dcFormat: string): string {
    return environment.assetStore[dcAccessRights]
      + "/"
      + assetType
      + "/"
      + id + "." + dcFormat;
  }

}
