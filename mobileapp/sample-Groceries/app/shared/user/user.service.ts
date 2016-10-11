import { Injectable } from "@angular/core"
import { Http, Headers, Response } from "@angular/http"

import { Observable } from "rxjs/Rx"
import "rxjs/add/operator/do"
import "rxjs/add/operator/map"

import 'rxjs/add/operator/toPromise'

import { User } from "./user"
import { Config } from "../config"

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    login(user: User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json")
        let body = {
            email: 'jamon@jamon.com',
            password: 'jamonjamon'
        }
        /** 
        return this.http.post(
            "http://api-tracker.noads.me/auth_user",
            JSON.stringify({
                email: 'jamon@jamon.com',
                password: 'jamonjamon',
                // grant_type: "password"
            }),
            { headers: headers }
        )
            // .map(response => response.json())
            .do(data => {
                // console.log('api-tracker: ')
                console.log(data)
                // Config.token = data.Result.access_token;
                // Config.token = data.user;
            })
            .catch(this.handleErrors);
            */

        return this.http.request("http://api-tracker.noads.me/auth_user",
            { method: "POST", headers: headers, body: body })
            .toPromise()
            .then(resp => resp.json())
            .catch(err => console.log(err))
    }

    register(user: User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return "todo: registrer"
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error))
        return Observable.throw(error)
    }
}
