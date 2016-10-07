import { Injectable } from '@angular/core';
import { Hero } from './app.component'
import { HEROES } from './mock.heroes'

@Injectable()
export class HeroService {
    $GetHeroes(): Promise<Hero[]> {
        return new Promise<Hero[]>(heroes => setTimeout(heroes, 3000))
            .then(() => {
                console.log('resolve heroes!')
                return HEROES
            })
    }

    $GetHero(id: number): Promise<Hero> {
        console.log(`selected hero -> ${id}`)
        return this.$GetHeroes()
            .then(heroes => heroes.find(hero => hero.id === id))
    }
}