// Angular Imports
import { TestBed } from '@angular/core/testing'
// This Component Imports
import { HeroesService } from './heroes.service'
import { Hero, HeroGender } from '@heroes/models'
// Shared Imports
import { LoaderService } from '@shared/services'

const mockLoaderService = {
	turnOnLoader: jest.fn(),
	turnOffLoader: jest.fn(),
}

describe('HeroesService', () => {
	let service: HeroesService

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [{ provide: LoaderService, useValue: mockLoaderService }, HeroesService],
		})
		service = TestBed.inject(HeroesService)
	})

	test('should be created', () => {
		expect(service).toBeTruthy()
	})

	test('should return all heroes', (done) => {
		service.getHeroes().subscribe(({ heroes }) => {
			expect(Array.isArray(heroes)).toBe(true)
			expect(heroes.length).toBeGreaterThan(0)
			done()
		})
	})

	test('should filter heroes by name', (done) => {
		service.getHeroes({ filterBy: 'bat' }).subscribe(({ heroes }) => {
			expect(heroes.some((h) => h.name.toLowerCase().includes('bat'))).toBe(true)
			done()
		})
	})

	test('should get a hero by id', (done) => {
		service.getHeroes().subscribe(({ heroes }) => {
			const hero = heroes[0]
			service.getHero({ heroId: hero.id }).subscribe(({ hero: heroFound }) => {
				expect(heroFound.id).toBe(hero.id)
				done()
			})
		})
	})

	test('should throw error if hero does not exist', (done) => {
		service.getHero({ heroId: 999999 }).subscribe({
			error: (error) => {
				expect(error.errorCode).toBe('heroId')
				done()
			},
		})
	})

	test('should add a new hero', (done) => {
		const newHero: Hero = {
			id: 111,
			slug: '111-angel',
			name: 'angel dust',
			gender: HeroGender.female,
			image: 'https://imagen.com',
			work: 'mercenary',
			biography: {
				fullName: 'chistina dust',
				alterEgos: 'archangel',
				aliases: ['archangel'],
				firstAppearance: 'moclock 2001',
				publisher: 'marvel commig',
			},
		}
		service.addHero({ hero: newHero }).subscribe(({ message }) => {
			expect(message).toBe('Hero added successfully!')
			service.getHero({ heroId: newHero.id }).subscribe(({ hero }) => {
				expect(hero.name).toBe('angel dust')
				done()
			})
		})
	})

	test('should throw error if adding hero with existing id', (done) => {
		service.getHeroes().subscribe(({ heroes }) => {
			const hero = heroes[0]
			service.addHero({ hero: { ...hero, slug: 'unique-slug' } }).subscribe({
				error: (error) => {
					expect(error.errorCode).toBe('id')
					done()
				},
			})
		})
	})

	test('should throw error if adding hero with existing slug', (done) => {
		service.getHeroes().subscribe(({ heroes }) => {
			const hero = heroes[0]
			service.addHero({ hero: { ...hero, id: 999999 } }).subscribe({
				error: (error) => {
					expect(error.errorCode).toBe('slug')
					done()
				},
			})
		})
	})

	test('should edit an existing hero', (done) => {
		service.getHeroes().subscribe(({ heroes }) => {
			const hero = heroes[0]
			const edited = { ...hero, name: 'Edited Hero' }
			service.editHero({ hero: edited }).subscribe(({ message }) => {
				expect(message).toBe('Hero edited successfully!')
				service.getHero({ heroId: hero.id }).subscribe(({ hero: heroFound }) => {
					expect(heroFound.name).toBe('Edited Hero')
					done()
				})
			})
		})
	})

	test('should throw error if editing non-existent hero', (done) => {
		const fakeHero: Hero = {
			id: 222,
			slug: '111-angel',
			name: 'angel dust',
			gender: HeroGender.female,
			image: 'https://imagen.com',
			work: 'mercenary',
			biography: {
				fullName: 'chistina dust',
				alterEgos: 'archangel',
				aliases: ['archangel'],
				firstAppearance: 'moclock 2001',
				publisher: 'marvel commig',
			},
		}
		service.editHero({ hero: fakeHero }).subscribe({
			error: (error) => {
				expect(error.errorCode).toBe('heroId')
				done()
			},
		})
	})

	test('should throw error if editing hero with existing slug', (done) => {
		service.getHeroes().subscribe(({ heroes }) => {
			const [hero1, hero2] = heroes
			if (!hero1 || !hero2) return done()
			const heroEdited = { ...hero1, slug: hero2.slug }
			service.editHero({ hero: heroEdited }).subscribe({
				error: (error) => {
					expect(error.errorCode).toBe('slug')
					done()
				},
			})
		})
	})

	test('should remove an existing hero', (done) => {
		service.getHeroes().subscribe(({ heroes }) => {
			const hero = heroes[0]
			service.removeHero({ heroId: hero.id }).subscribe(({ message }) => {
				expect(message).toBe('Hero removed successfully!')
				service.getHero({ heroId: hero.id }).subscribe({
					error: (error) => {
						expect(error.errorCode).toBe('heroId')
						done()
					},
				})
			})
		})
	})

	test('should throw error if removing non-existent hero', (done) => {
		service.removeHero({ heroId: 999999 }).subscribe({
			error: (error) => {
				expect(error.errorCode).toBe('heroId')
				done()
			},
		})
	})
})
