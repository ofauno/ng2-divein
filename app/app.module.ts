import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

// import { AppComponent } from './app.component'
import { HeroDetailComponent } from './app.component'
import { DashboardComponent } from './app.component'
import { NavComponent } from './app.component'
import { HeroesComponent } from './app.component'
import { HeroService } from './data.service'

import { Routing } from './app.routing'

@NgModule({
    imports: [
        BrowserModule
        , FormsModule
        , Routing
    ]
    , declarations: [
        // AppComponent
        NavComponent
        , DashboardComponent
        , HeroesComponent
        , HeroDetailComponent
    ]
    , providers: [
        HeroService
    ]
    , bootstrap: [
        NavComponent
    ]
})

export class AppModule { }