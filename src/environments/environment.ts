// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { LOCALE_ID, NgModule } from "@angular/core";
import { version, dependencies } from '../../package.json';

import { AbstractArchieDocService } from '../app/_services/abstract-archie-doc-service';
import { MockArchieDocService } from '../app/_services/dev/mock-archie-doc-service';
import { AbstractReportsService } from '../app/_services/abstract-reports-service';
import { MockReportsService } from '../app/_services/dev/mock-reports-service';
import { AbstractStorageService } from "../app/_services/abstract-storage-service";
import { MockStorageService } from '../app/_services/dev/mock-storage-service';
import { AbstractUsersService } from "../app/_services/abstract-users-service";
import { MockUsersService } from '../app/_services/dev/mock-users-service';


export const environment = {
   production: false,
   locationOrigin: "http://localhost",
   assetStore: {
      public: "http://localhost/assetstore/public",
      private: "http://localhost/assetstore/private"
   },
   componentsVersion: {
      archie: version,
      angular: dependencies["@angular/core"],
      material: dependencies["@angular/material"]
   },
   providers: [
      { provide: AbstractArchieDocService, useClass: MockArchieDocService },
      { provide: AbstractReportsService, useClass: MockReportsService },
      { provide: AbstractStorageService, useClass: MockStorageService },
      { provide: AbstractUsersService, useClass: MockUsersService },
      { provide: LOCALE_ID, useValue: "he" }
   ]
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/*

Release workflow:

1. Commit changes
2. Change version field in package.json to the next version
   and remove the SNAPSHOT suffix.
   Example: 1.0.0
3. Commit changes. Message: prepare release archie-beeri-gui-x.y.z
   Example: prepare release archie-beeri-gui-1.0.0
4. Create tag archie-beeri-gui-x.y.z
   Example: archie-beeri-gui-1.0.0
5. Change version field to x.y.z-SNAPSHOT
   where x.y.z is the next bugfix version.
   Example: 1.0.1-SNAPSHOT
6. Commit changes. Message: prepare for next development iteration.

*/
