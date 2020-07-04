// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  assetStore: {
    public: "https://archie-beeri-public-test.s3-eu-west-1.amazonaws.com",
    private: "https://archie-beeri-private-test.s3-eu-west-1.amazonaws.com"
  },
  version: "2.0.0"
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
2. Change version field in environment.ts and environment.prod.ts to the next version 
   and remove the SNAPSHOT suffix.
   Example: 1.0.0
3. Commit changes. Message: prepare release archie-beeri-gui-x.y.z
   Example: prepare release archie-beeri-gui-1.0.0
4. Create tag archie-beeri-gui-x.y.z
   Example: archie-beeri-gui-1.0.0
5. Change version field in environment.ts and environment.prod.ts to x.y.z-SNAPSHOT 
   where x.y.z is the next bugfix version.
   Example: 1.0.1-SNAPSHOT
6. Commit changes

*/