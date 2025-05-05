// Angular Imports
import { inject, Injectable } from '@angular/core'
// This Module Imports
import { Hero } from '@heroes/models'
import { heroAdapter, HeroFromData } from './heroes.adapter'
import { heroes as heroesData } from './heroes.data'
// Shared Imports
import { LoaderService } from '@shared/services'
// Thirdparty Imports
import { BehaviorSubject, Observable, of, throwError, delay, tap, finalize } from 'rxjs'

@Injectable()
export class HeroesService {
	readonly #loaderService = inject(LoaderService)

	#heroes = new BehaviorSubject<Hero[]>([])

	constructor() {
		this.#getHeroesFromData()
	}

	getHeroes(options: { filterBy?: string } = {}): Observable<{ heroes: Hero[] }> {
		const { filterBy } = options
		if (!filterBy) return this.#of({ heroes: this.#heroes.value })

		const heroesFiltered = this.#heroes.value.filter(
			(_hero) =>
				String(_hero.id).toLowerCase().includes(filterBy.toLowerCase()) ||
				String(_hero.slug).toLowerCase().includes(filterBy.toLowerCase()) ||
				String(_hero.name).toLowerCase().includes(filterBy.toLowerCase()),
		)
		return this.#of({ heroes: heroesFiltered })
	}

	getHero({ heroId }: { heroId: number }): Observable<{ hero: Hero }> {
		const currentHero = this.#heroes.value.find((_hero) => _hero.id === heroId)

		if (!currentHero) {
			return throwError(() => ({
				errorCode: 'heroId',
				message: `A hero with this id doesn't exists!`,
			}))
		}
		return this.#of({ hero: currentHero })
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
		return this.#of({ message: 'Hero added successfully!' })
	}

	editHero({ hero }: { hero: Hero }): Observable<{ message: string }> {
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
		return this.#of({ message: 'Hero edited successfully!' })
	}

	removeHero({ heroId }: { heroId: number }): Observable<{ message: string }> {
		const currentHero = this.#heroes.value.find((_hero) => _hero.id === heroId)
		const currentHeroesWithoutCurrentHero = this.#heroes.value.filter(
			(_hero) => _hero.id !== heroId,
		)

		if (!currentHero) {
			return throwError(() => ({
				errorCode: 'heroId',
				message: `A hero with this id doesn't exists!`,
			}))
		}

		this.#heroes.next([...currentHeroesWithoutCurrentHero])
		return this.#of({ message: 'Hero removed successfully!' })
	}

	#getHeroesFromData(): void {
		const heroes: Hero[] = heroesData.map((hero: HeroFromData) => heroAdapter(hero))
		this.#heroes.next(heroes)
	}

	#of<T>(value: T): Observable<T> {
		return of(value).pipe(
			tap(() => this.#loaderService.turnOnLoader()),
			delay(1500),
			finalize(() => this.#loaderService.turnOffLoader()),
		)
	}
}
