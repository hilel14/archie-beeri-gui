import { version } from '../../package.json';
import { dependencies } from '../../package.json';


export const environment = {
  production: true,
  locationOrigin: window.location.origin,
  assetStore: {
    public: "https://archie-beeri-public.s3-eu-west-1.amazonaws.com",
    private: "https://archie-beeri-private.s3-eu-west-1.amazonaws.com"
  },
  componentsVersion: {
    archie: version,
    angular: dependencies["@angular/core"],
    material: dependencies["@angular/material"]
  }
};
