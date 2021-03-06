import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule }    from '@angular/http'

import { HeroDetailComponent } from './app.component'
import { DashboardComponent } from './app.component'
import { NavComponent } from './app.component'
import { HeroesComponent, HeroSearchComponent } from './app.component'
import { HeroService } from './data.service'

import { Routing } from './app.routing'

@NgModule({
    imports: [
        BrowserModule
        , FormsModule
        , HttpModule
        , Routing
    ]
    , declarations: [
        NavComponent
        , DashboardComponent
        , HeroesComponent
        , HeroDetailComponent
        , HeroSearchComponent
    ]
    , providers: [
        HeroService
    ]
    , bootstrap: [
        NavComponent
    ]
})

export class AppModule { }