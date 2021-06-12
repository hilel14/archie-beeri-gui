import { LayoutModule } from "@angular/cdk/layout";
import { registerLocaleData } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import localeHeExtra from "@angular/common/locales/extra/he";
import localeHe from "@angular/common/locales/he";
import { LOCALE_ID, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtModule } from '@auth0/angular-jwt';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DcCollectionComponent } from './dc-collection/dc-collection.component';
import { EditDocumentComponent } from "./edit-document/edit-document.component";
import { ImportFolderComponent } from "./import-folder/import-folder.component";
import { JwtInterceptor } from "./jwt-interceptor";
import { LoginComponent } from "./login/login.component";
import { MaterialModule } from "./material.module";
import { ImportFileReportComponent } from "./reports/import-file-report/import-file-report.component";
import { ImportFolderReportComponent } from "./reports/import-folder-report/import-folder-report.component";
import { SearchResultsComponent } from "./search-results/search-results.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AboutComponent } from './about/about.component';
import { RemarksDialogComponent } from './remarks-dialog/remarks-dialog.component';
import { SearchResultsFiltersComponent } from './search-results-filters/search-results-filters.component';
import { SearchResultsNavbarComponent } from './search-results-navbar/search-results-navbar.component';
import { env } from "process";
import { environment } from "src/environments/environment";

registerLocaleData(localeHe, "he", localeHeExtra);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ToolbarComponent,
    SearchResultsComponent,
    EditDocumentComponent,
    ImportFolderReportComponent,
    ImportFileReportComponent,
    ImportFolderComponent,
    LoginComponent,
    DcCollectionComponent,
    AboutComponent,
    RemarksDialogComponent,
    SearchResultsFiltersComponent,
    SearchResultsNavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    FlexLayoutModule,
    MaterialModule,
    SocialLoginModule
    //JwtModule.forRoot({})
    //JwtModule
  ],
  entryComponents: [
    RemarksDialogComponent
  ],
  /*
  providers: [
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
  ],
  */
  providers: environment.providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
