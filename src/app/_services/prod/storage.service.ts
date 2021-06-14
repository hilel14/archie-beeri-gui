import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AbstractStorageService } from '../abstract-storage-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements AbstractStorageService {

  constructor() { }

  getUrl(dcAccessRights: string, assetType: string, id: string, dcFormat: string): string {
    return environment.assetStore[dcAccessRights]
      + "/"
      + assetType
      + "/"
      + id + "." + dcFormat;
  }

}
