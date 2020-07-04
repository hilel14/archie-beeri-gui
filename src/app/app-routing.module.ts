import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoleGuardService as RoleGuard } from './auth/role-guard.service';
import { DcCollectionComponent } from "./dc-collection/dc-collection.component";
import { EditDocumentComponent } from "./edit-document/edit-document.component";
import { ImportFolderComponent } from "./import-folder/import-folder.component";
import { LoginComponent } from "./login/login.component";
import { ImportFileReportComponent } from "./reports/import-file-report/import-file-report.component";
import { ImportFolderReportComponent } from "./reports/import-folder-report/import-folder-report.component";
import { SearchResultsComponent } from "./search-results/search-results.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AboutComponent } from "./about/about.component";

const routes: Routes = [
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent },
  { path: "welcome", component: WelcomeComponent },
  { path: "search", component: SearchResultsComponent },
  { path: "edit/:docId", component: EditDocumentComponent },
  {
    path: "import-folder",
    component: ImportFolderComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'manager'
    }
  },
  { path: "import-folder-report", component: ImportFolderReportComponent },
  { path: "import-file-report/:folderId", component: ImportFileReportComponent },
  { path: "collection/:dcTitle", component: DcCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
