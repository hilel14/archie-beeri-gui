import { Injectable } from "@angular/core";
import { User } from "../_model/user";

@Injectable({
    providedIn: "root",
})
export abstract class AbstractUsersService {
    public abstract login(username: string, password: string): void;
    public abstract googleLogin(): void;
    public abstract hasPermission(roles: string[]): boolean;
    public abstract logout(): void;
    public abstract getCurrentUser(): User;
}