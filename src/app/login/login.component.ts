import { Component, OnInit } from "@angular/core";

import { UsersService } from "../users.service";
import { User } from "../model/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private usersService: UsersService) {}

  ngOnInit() {}

  login(): void {
    this.usersService.login(this.username, this.password);
  }

}
