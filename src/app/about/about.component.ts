import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  apiVersion: String = "?";
  wsVersion: String = "?";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getApiVersion();
  }

  getEnvironment() {
    return environment.production ? "production" : "development";
  }

  getUiVersion() {
    return environment.componentsVersion.archie;
  }

  getAngularVersion() {
    return environment.componentsVersion.angular;
  }

  getMaterialVersion() {
    return environment.componentsVersion.material;
  }

  getApiVersion() {
    let url = environment.locationOrigin + "/rest/about";
    this.http.get(url)
      .subscribe((data: any) =>
        this.apiVersion = data["version"]);
  }

}
