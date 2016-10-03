import { Component, OnInit } from '@angular/core'
import { HeroService } from './data.service'

export class Hero {
  id: number
  name: string
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
  , selector: 'my-fau-app',
  template: `
    <hero-detail [hero]="selectedHero"></hero-detail>

    <h2>My Heroes</h2>
    <ul class="heroes">
      <li [class.selected]="hero === selectedHero" 
          (click)="OnSelectedHero(hero)" 
          *ngFor="let hero of heroes">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    `
  , providers: [HeroService]
})
export class AppComponent implements OnInit{
  constructor(private heroService: HeroService) {}
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

import { Input } from '@angular/core';
@Component({
  selector: 'hero-detail',
  template: `
    <div *ngIf="hero">
      <pre>{{hero.id}}</pre>
      <h1>{{title}}</h1><h2>{{hero.name}}</h2>
      <br>
      <label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name">
    </div>
  `
})
export class HeroDetailComponent {
  @Input()
  hero: Hero;
}