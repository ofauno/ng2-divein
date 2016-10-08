import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Location } from '@angular/common'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { HeroService, HeroSearchService } from './data.service'

export class Hero {
  id: number
  name: string
}

@Component({
  // moduleId: module.id,
  selector: 'hero-search',
  templateUrl: 'hero-search.component.html',
  styleUrls: ['hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>
  private searchTerms = new Subject<string>()

  constructor(
    private heroSearch: HeroSearchService,
    private router: Router) { }
  // Push a search term into the observable stream.
  SearchHero(heroTyped: string): void {
    this.searchTerms.next(heroTyped)
  }

  ngOnInit(): void {
    console.log(`HeroSearchComponent::init`)
    console.log(this.heroes)
    this.heroes = this.searchTerms
      .debounceTime(500)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.heroSearch.Search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Hero[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Hero[]>([])
      });
  }

  GoToHeroDetail(hero: Hero): void {
    let link = ['/detail', hero.id]
    this.router.navigate(link)
  }
}

@Component({
  selector: 'dashboard'
  , styleUrls: ['dashboard.component.css']
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
  styleUrls: ['nav.component.css'],
  template: `
  <hero-search></hero-search>

     <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
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

  ngOnInit(): void {
    this.heroService.$GetHeroes()
      .then(heroes => this.heroes = heroes)
  }
  DeleteHero(hero: Hero): void {
    console.log(`HeroesComponent::delete ->${hero.name}<-`)
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero)
        if (this.selectedHero === hero) {
          this.selectedHero = null
        }
      })
  }

  AddHero(heroName: string): void {
    heroName.trim()
    if (!heroName) { return }

    this.heroService.create(heroName)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
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
  styleUrls: ['hero-detail.component.css'],
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

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack())
    console.log('HeroDetailComponent::saved')
  }

  goBack(): void {
    this.location.back();
    console.log('HeroDetailComponent::back')
  }

}
