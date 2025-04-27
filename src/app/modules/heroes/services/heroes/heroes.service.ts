// Angular Imports
import { Injectable } from '@angular/core'
// This Module Imports
import { Hero } from '@heroes/models'
import { heroAdapter, HeroFromData } from './heroes.adapter'
import { heroes as heroesData } from './heroes.data'
// Thirdparty Imports
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'

@Injectable()
export class HeroesService {
	#heroes = new BehaviorSubject<Hero[]>([])

	constructor() {
		this.#getHeroesFromData()
	}

	getHeroes(): Observable<Hero[]> {
		// console.log('heroes', this.#heroes.value)
		return this.#heroes.asObservable()
	}

	getHero({ heroId }: { heroId: number }) {
		const currentHero = this.#heroes.value.find((_hero) => _hero.id === heroId)

		if (!currentHero) {
			return throwError(() => ({
				errorCode: 'heroId',
				message: `A hero with this id doesn't exists!`,
			}))
		}
		return of({ hero: currentHero })
	}

	addHero({ hero }: { hero: Hero }): Observable<{ message: string }> {
		const currentHeroes = this.#heroes.value
		const existsId = currentHeroes.some((_hero) => _hero.id === hero.id)
		const existsSlug = currentHeroes.some((_hero) => _hero.slug === hero.slug)
		if (existsId) {
			return throwError(() => ({
				errorCode: 'id',
				message: 'A hero with this ID already exists!',
			}))
		}
		if (existsSlug) {
			return throwError(() => ({
				errorCode: 'slug',
				message: 'A hero with this Slug already exists!',
			}))
		}
		this.#heroes.next([hero, ...currentHeroes])
		return of({ message: 'Hero added successfully!' })
	}

	editHero({ hero }: { hero: Hero }) {
		const currentHero = this.#heroes.value.find((_hero) => _hero.id === hero.id)
		const currentHeroesWithoutCurrentHero = this.#heroes.value.filter(
			(_hero) => _hero.id !== hero.id,
		)
		const existsSlug = currentHeroesWithoutCurrentHero.some((_hero) => _hero.slug === hero.slug)

		if (!currentHero) {
			return throwError(() => ({
				errorCode: 'heroId',
				message: `A hero with this id doesn't exists!`,
			}))
		}
		if (existsSlug) {
			return throwError(() => ({
				errorCode: 'slug',
				message: 'A hero with this Slug already exists!',
			}))
		}

		this.#heroes.next([hero, ...currentHeroesWithoutCurrentHero])
		return of({ message: 'Hero edited successfully!' })
	}

	removeHero({ heroId }: { heroId: number }): void {
		const currentHeroes = this.#heroes.value
		const currentHeroesFiltered = currentHeroes.filter((hero) => hero.id !== heroId)
		this.#heroes.next(currentHeroesFiltered)
	}

	#getHeroesFromData(): void {
		// console.log('set initial heroes')
		const heroes: Hero[] = heroesData.map((hero: HeroFromData) => heroAdapter(hero))
		this.#heroes.next(heroes)
	}
}
