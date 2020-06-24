import { Injectable } from '@angular/core';

const assetStore = {
  public: "https://archie-beeri-public.s3-eu-west-1.amazonaws.com",
  private: "https://archie-beeri-private.s3-eu-west-1.amazonaws.com"
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // https://archie-beeri-asset-store.s3-eu-west-1.amazonaws.com/public/assets/016e7b0a-fcef-4fa3-b531-16399fb7f4f6.jpg
  getUrl(dcAccessRights: string, assetType: string, id: string, dcFormat: string): string {
    return assetStore[dcAccessRights] + "/" + assetType + "/" + id + "." + dcFormat;
  }

}
