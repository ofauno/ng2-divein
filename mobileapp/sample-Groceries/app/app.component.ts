import { Component } from "@angular/core"
import { User } from "./shared/user/user"
import { UserService } from "./shared/user/user.service"
import { Router } from "@angular/router"

@Component({
  selector: "list-view",
  templateUrl: "pages/list/list.html",
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"]
})
export class ListView { }


@Component({
  moduleId: module.id,
  providers: [UserService],
  selector: "login-view",
  styleUrls: ['pages/login/login-common.css', 'pages/login/login.css'],
  templateUrl: "pages/login/login.html"
})
export class LoginView {
  user: User
  Email = "nativescriptrocks@telerik.com"
  IsLoggingIn = true

  constructor(private router: Router, private userService: UserService) {
    this.user = new User();
  }

  Submit() {
    if (this.IsLoggingIn) {
    this.login()
    } else {
      this.signUp()
    }
    // alert(`hello::${this.user.Email}`)
  }

  login() {
    this.userService.login(this.user)
      .then(data => {
        console.log(data)
        this.router.navigate(["/list-view"])
      })

    // .subscribe(() => this.router.navigate(["/list-view"]),
    // (error) => alert("Unfortunately we could not find your account."))
  }

  signUp() {
    alert(this.userService.register(this.user))
  }

  ToggleDisplay() {
    this.IsLoggingIn = !this.IsLoggingIn;
  }
}

@Component({
  selector: "main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent { }
