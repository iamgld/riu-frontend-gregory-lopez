// Angular Imports
import { Injectable } from '@angular/core'
// This Module Imports
import { Hero } from '@heroes/models'
import { heroAdapter, HeroFromData } from './heroes.adapter'
import { heroes as heroesData } from './heroes.data'
// Thirdparty Imports
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable()
export class HeroesService {
	#heroes = new BehaviorSubject<Hero[]>([])

	constructor() {
		this.#getHeroesFromData()
	}

	getHeroes(): Observable<Hero[]> {
		return this.#heroes.asObservable()
	}

	addHero({ hero }: { hero: Hero }): void {
		const currentHeroes = this.#heroes.value
		this.#heroes.next([...currentHeroes, hero])
	}

	removeHero({ heroId }: { heroId: number }): void {
		const currentHeroes = this.#heroes.value
		const currentHeroesFiltered = currentHeroes.filter((hero) => hero.id !== heroId)
		this.#heroes.next(currentHeroesFiltered)
	}

	#getHeroesFromData(): void {
		const heroes: Hero[] = heroesData.map((hero: HeroFromData) => heroAdapter(hero))
		this.#heroes.next(heroes)
	}
}
