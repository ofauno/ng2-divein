import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent, DashboardComponent, HeroDetailComponent } from './app.component'

const appRoutes: Routes = [
    {
        path: 'heroes',
        component: HeroesComponent
    }
    , {
        path: 'dashboard',
        component: DashboardComponent
    }
    , {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
    , {
        path: 'detail/:id',
        component: HeroDetailComponent
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);