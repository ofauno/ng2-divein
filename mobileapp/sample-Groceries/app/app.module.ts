import { NgModule } from "@angular/core"
import { NativeScriptModule } from "nativescript-angular/platform"
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { NativeScriptHttpModule } from "nativescript-angular/http"
import { NativeScriptRouterModule } from "nativescript-angular/router"

import { AppComponent } from "./app.component"
import { Routes, Views } from "./app.routing"

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(Routes)
  ],
  declarations: [
    AppComponent,
    ...Views
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
