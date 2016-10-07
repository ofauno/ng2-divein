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
  styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`]
  , selector: 'heroes',
  template: `
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li [class.selected]="hero === selectedHero" 
          (click)="OnSelectedHero(hero)" 
          *ngFor="let hero of heroes">

        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>

    <div *ngIf="selectedHero">
      <h2>
        {{selectedHero.name | uppercase}} is my hero
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>
    `
  , providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService) { }
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
    console.log(`selected hero -> ${hero.id}`)
    this.selectedHero = hero
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
      console.log(params)

      let id = params['id']
      this.heroService.$GetHero(id)
        .then(hero => {
          console.log(`hero -> ${hero}`)
          this.hero = hero
        })
    })
  }

  goBack(): void {
    this.location.back();
  }

}