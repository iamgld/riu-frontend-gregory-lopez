// Angular Imports
import { Component, DestroyRef, inject, signal, viewChild, afterNextRender } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
// This Module Imports
import { HeroesService } from '@heroes/services'
import { Hero } from '@heroes/models'
import { ConfirmRemoveHeroComponent } from '@heroes/components'
// Shared Imports
import { MaterialModule } from '@shared/modules'

@Component({
	standalone: true,
	selector: 'app-heroes',
	imports: [MaterialModule],
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
	readonly #heroesService = inject(HeroesService)
	readonly #destroyRef = inject(DestroyRef)
	readonly #router = inject(Router)
	readonly #dialog = inject(MatDialog)
	readonly #snackBar = inject(MatSnackBar)

	displayedColumns: string[] = ['id', 'name', 'gender', 'actions']
	dataSources = signal(new MatTableDataSource<Datasource>([]))
	paginator = viewChild(MatPaginator)

	constructor() {
		afterNextRender(() => {
			this.#getHeroes()
		})
	}

	viewHero({ heroId }: { heroId: number }) {
		this.#router.navigate(['/heroes', heroId])
	}

	editHero({ heroId }: { heroId: number }) {
		this.#router.navigate(['/heroes', heroId, 'edit'])
	}

	openRemoveHeroDialog({ heroId }: { heroId: number }) {
		// Remove focus from current item to avoid accessibility warnign by browser
		const activeElement = document.activeElement as HTMLElement
		activeElement?.blur()

		const dialogRef = this.#dialog.open(ConfirmRemoveHeroComponent, {
			autoFocus: true,
			data: { heroId },
		})

		dialogRef
			.afterClosed()
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe((action) => {
				if (action) this.#removeHero({ heroId })
			})
	}

	#getHeroes() {
		this.#heroesService
			.getHeroes()
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: ({ heroes }) => {
					// console.log({ heroes })
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

	#removeHero({ heroId }: { heroId: number }) {
		this.#heroesService
			.removeHero({ heroId })
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: ({ message }) => {
					this.#openSnackBar({ message, duration: 3000, panelClass: ['snackbar-green'] })
					this.#getHeroes()
				},
				error: (error) => {
					this.#openSnackBar({
						message: error.message,
						duration: 8000,
						panelClass: ['snackbar-red'],
					})
				},
			})
	}

	#openSnackBar({
		message,
		duration,
		panelClass,
	}: {
		message: string
		duration: number
		panelClass: string[]
	}) {
		this.#snackBar.open(message, '', { duration, panelClass })
	}
}

interface Datasource {
	id: number
	name: string
	gender: string
}
