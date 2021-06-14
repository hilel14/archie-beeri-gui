import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from '@angular/material/icon';

import { UsersService } from "../users.service";
import { User } from "../_model/user";

const googleLogoURL =
  "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private usersService: UsersService, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }

  ngOnInit() { }

  login(): void {
    this.usersService.login(this.username, this.password);
  }

  googleLogin() {
    this.usersService.googleLogin();
  }

}
