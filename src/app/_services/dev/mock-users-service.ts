import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { User } from "../../_model/user";
import { AbstractUsersService } from "../abstract-users-service";

@Injectable({
    providedIn: 'root'
})
export class MockUsersService implements AbstractUsersService {

    constructor(private router: Router) {
    }

    public login(username: string, password: string): void {
        let user: User = {
            id: 1,
            username: username,
            fullname: "Avi Ron",
            role: "manager",
            token: "abcd-1234"
        };
        this.storeUserDetails(user);
    }

    public googleLogin(): void {
        console.info("mock google login...");
    }

    hasPermission(roles: string[]): boolean {
        if (localStorage.getItem("archieUser")) {
            let user = JSON.parse(localStorage.getItem("archieUser"));
            return roles.includes(user.role);
        }
        return false;
    }

    logout() {
        localStorage.removeItem("archieUser");
    }

    getCurrentUser(): User {
        if (localStorage.getItem("archieUser")) {
            return JSON.parse(localStorage.getItem("archieUser"));
        }
        return undefined;
    }

    storeUserDetails(user: User) {
        if (user) {
            localStorage.setItem("archieUser", JSON.stringify(user));
            this.router.navigate(["/welcome"]);
        }
    }

}