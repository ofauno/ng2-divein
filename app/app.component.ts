import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from './data.service'

export class Hero {
  id: number
  name: string
}

@Component({
  selector: 'dashboard'
  // template: '<h3>My Dashboard</h3>'
  , templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = []
  constructor(
    private heroService: HeroService
    , private router: Router,
  ) { }

  ngOnInit(): void {
    this.heroService.$GetHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 3))
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}

@Component({
  selector: 'app-main',
  template: `
    <h1>{{title}}</h1>
    <nav>
     <a routerLink="/dashboard">Dashboard</a>
     <a routerLink="/heroes">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class NavComponent {
  title = 'Tour of Heroes';
}

@Component({
  moduleId: module.id
  , styleUrls: ['../heroes.component.css']
  , selector: 'heroes',
  templateUrl: '../heroes.component.html'
  , providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  constructor(
    private router: Router,
    private heroService: HeroService) { }
  
  title = 'tour of jamon'
  selectedHero: Hero
  heroes: Hero[]
  hero: Hero = {
    id: 1000,
    name: 'don jamon'
  }

  ngOnInit(): void {
    this.heroService.$GetHeroes()
      .then(heroes => this.heroes = heroes)
  }

  OnSelectedHero(hero: Hero): void {
    console.log(`HeroesComponent::selected hero -> ${hero.id}`)
    this.selectedHero = hero
  }

  GoToDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id])
    console.log('HeroesComponent::jamon')
  }
}

@Component({
  selector: 'hero-detail',
  templateUrl: 'hero-detail.component.html'
  // template: `
  //   <div *ngIf="hero">
  //     <pre>{{hero.id}}</pre>
  //     <h1>{{title}}</h1><h2>{{hero.name}}</h2>
  //     <br>
  //     <label>name: </label>
  //     <input [(ngModel)]="hero.name" placeholder="name">
  //   </div>

  //   <button (click)="goBack()">Back</button>
  // `
})
export class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      console.log(`HeroDetailComponent::`)
      console.log(params)

      this.heroService.$GetHero(params['id'])
        .then(hero => {
          console.log(`HeroDetailComponent::hero -> ${hero}`)
          this.hero = hero
        })
    })
  }

  goBack(): void {
    this.location.back();
    console.log('HeroDetailComponent::back')
  }

}
