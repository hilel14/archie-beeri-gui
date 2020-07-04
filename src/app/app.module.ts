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
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    FlexLayoutModule,
    MaterialModule
    //JwtModule.forRoot({})
    //JwtModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "he" },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
