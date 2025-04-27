// Angular Imports
import { Component, DestroyRef, inject, signal, viewChild, AfterViewInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { MatPaginator } from '@angular/material/paginator'
// This Module Imports
import { HeroesService } from '@heroes/services'
import { Hero } from '@heroes/models'
// Shared Imports
import { MaterialModule } from '@shared/modules'
import { MatTableDataSource } from '@angular/material/table'

@Component({
	standalone: true,
	selector: 'app-heroes',
	imports: [MaterialModule],
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements AfterViewInit {
	readonly #heroesService = inject(HeroesService)
	readonly #destroyRef = inject(DestroyRef)
	readonly #router = inject(Router)

	displayedColumns: string[] = ['id', 'name', 'gender', 'actions']
	dataSources = signal(new MatTableDataSource<Datasource>([]))
	paginator = viewChild(MatPaginator)

	ngAfterViewInit() {
		this.#getHeroes()
	}

	editHero({ heroId }: { heroId: number }) {
		this.#router.navigate(['/heroes', heroId, 'edit'])
	}

	removeHero({ heroId }: { heroId: number }) {
		console.log('removeHero', heroId)
	}

	#getHeroes() {
		this.#heroesService
			.getHeroes()
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: (heroes) => {
					this.#updateDatasource({ heroes })
				},
				error: (error) => {
					console.error('Error fetching heroes:', error)
				},
			})
	}

	#updateDatasource({ heroes }: { heroes: Hero[] }) {
		this.dataSources().data = this.#transformHeroesToDatasource({ heroes })
		this.dataSources().paginator = this.paginator() ?? null
	}

	#transformHeroesToDatasource({ heroes }: { heroes: Hero[] }) {
		const dataSources: Datasource[] = heroes.map((hero) => {
			const dataSource: Datasource = {
				id: hero.id,
				name: hero.name,
				gender: hero.gender,
			}
			return dataSource
		})
		return dataSources
	}
}

interface Datasource {
	id: number
	name: string
	gender: string
}
