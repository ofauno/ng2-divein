import { Injectable } from "@angular/core"
import { Http, Headers, Response } from "@angular/http"

import { Observable } from "rxjs/Rx"
import "rxjs/add/operator/do"
import "rxjs/add/operator/map"

import { User } from "./user"
import { Config } from "../config"

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    login(user: User) {
        console.log(user)
        let headers = new Headers();
        // headers.append("Content-Type", "application/json")

        return this.http.post(
            "http://192.168.99.100:3000/auth_user",
            JSON.stringify({
                username: 'jamon@jamon.com',
                password: 'jamonjamon',
                // grant_type: "password"
            }),
            { headers: headers }
        )
            // .map(response => response.json())
            .do(data => {
                console.log(data)
                // Config.token = data.Result.access_token;
            })
            .catch(this.handleErrors);
    }

    register(user: User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.post(
            Config.apiUrl + "Users",
            JSON.stringify({
                Username: user.Email,
                Email: user.Email,
                Password: user.Password
            }),
            { headers: headers })
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}
