import { Component, OnInit } from "@angular/core";

import { UsersService } from "../users.service";
import { User } from "../model/user";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"]
})
export class ToolbarComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit() {}

  getUserInfo(): string {
    let user: User = this.usersService.getCurrentUser();
    return user ? user.fullname : "אורח";
  }

  getUsersService(): UsersService {
    return this.usersService;
  }
}
