import { Component, OnInit } from "@angular/core";

import { AbstractUsersService } from "../_services/abstract-users-service";
import { User } from "../_model/user";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"]
})
export class ToolbarComponent implements OnInit {
  constructor(private usersService: AbstractUsersService) {}

  ngOnInit() {}

  getUserInfo(): string {
    let user: User = this.usersService.getCurrentUser();
    return user ? user.fullname : "אורח";
  }

  getUsersService(): AbstractUsersService {
    return this.usersService;
  }
}
