import { Component } from "@angular/core"
import { User } from "./shared/user/user"
import { UserService } from "./shared/user/user.service"

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

  constructor(private userService: UserService) {
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
    // TODO: Define
  }
  signUp() {
    this.userService.register(this.user)
      .subscribe(() => {
        alert("Your account was successfully created.")
        this.ToggleDisplay();
      }, () => {
        alert("Unfortunately we were unable to create your account.")
      })
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
