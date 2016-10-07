import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './app.component'
// import { HEROES } from './mock.heroes'

@Injectable()
export class HeroService {
    private heroesUrl = 'http://192.168.99.100:3000/fakes';  // URL to web api

    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('HeroService::An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private headers = new Headers({ 'Content-Type': 'application/json' });

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`

        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }
    
    $GetHeroes(): Promise<Hero[]> {
        // return new Promise<Hero[]>(heroes => setTimeout(heroes, 3000))
        //     .then(() => {
        //         console.log('HeroService::resolve heroes!')
        //         return HEROES
        //     })
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json() as Hero[])
            .catch(this.handleError);
    }

    $GetHero(id): Promise<Hero> {
        console.log(`HeroService::selected hero -> ${id}`)
        return this.$GetHeroes()
            .then(heroes => heroes.find(hero => {
                return hero.id === +id;
            }))
    }
}