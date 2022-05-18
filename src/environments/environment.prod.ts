import { version } from '../../package.json';
import { dependencies } from '../../package.json';

import { LOCALE_ID, NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';

import { JwtInterceptor } from "../app/jwt-interceptor";
import { AbstractArchieDocService } from '../app/_services/abstract-archie-doc-service';
import { ArchieDocumentService } from '../app/_services/prod/archie-doc.service';
import { AbstractReportsService } from '../app/_services/abstract-reports-service';
import { ReportsService } from '../app/_services/prod/reports-service';
import { AbstractStorageService } from "../app/_services/abstract-storage-service";
import { StorageService } from '../app/_services/prod/storage.service';
import { AbstractUsersService } from "../app/_services/abstract-users-service";
import { UsersService } from '../app/_services/prod/users.service';


export const environment = {
  production: true,
  locationOrigin: "https://archie.beeri.org.il",
  assetStore: {
    public: "https://archie-beeri-public.s3-eu-west-1.amazonaws.com",
    private: "https://archie-beeri-private.s3-eu-west-1.amazonaws.com"
  },
  componentsVersion: {
    archie: version,
    angular: dependencies["@angular/core"],
    material: dependencies["@angular/material"]
  },
  providers: [
    { provide: AbstractArchieDocService, useClass: ArchieDocumentService },
    { provide: AbstractReportsService, useClass: ReportsService },
    { provide: AbstractStorageService, useClass: StorageService },
    { provide: AbstractUsersService, useClass: UsersService },
    { provide: LOCALE_ID, useValue: "he" },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '573921547371-qt1ncdtd7u17ru358hkkko4agucih7cd'
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    }
  ]
};
