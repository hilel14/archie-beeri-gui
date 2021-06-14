import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export abstract class AbstractStorageService {
    public abstract getUrl(dcAccessRights: string, assetType: string, id: string, dcFormat: string): string;
}