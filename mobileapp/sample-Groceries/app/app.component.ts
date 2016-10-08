import { Component } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "my-mobile-app",
  styleUrls: ['pages/login/login-common.css', 'pages/login/login.css'],
  template: `
  <StackLayout>
    <Image src="res://logo_login" stretch="none" horizontalAlignment="center"></Image>
    <TextField hint="Email Address" keyboardType="email" [(ngModel)]="email"
  autocorrect="false" autocapitalizationType="none"></TextField>
    <TextField hint="Password" secure="true"></TextField>

    <Button class="submit-button" text="Sign in" (tap)="Submit()"></Button>
    <Button text="Sign up for Groceries"></Button>
  </StackLayout>
  `
})
export class AppComponent {
  email = "nativescriptrocks@telerik.com";
  Submit() {
    alert(`hello::${this.email}`);
  }
}