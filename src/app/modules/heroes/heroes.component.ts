// Angular Imports
import {
	Component,
	DestroyRef,
	inject,
	signal,
	viewChild,
	afterNextRender,
	ElementRef,
} from '@angular/core'
import { Router } from '@angular/router'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
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
// Thirdparty Imports
import { debounceTime, finalize } from 'rxjs'

@Component({
	standalone: true,
	selector: 'app-heroes',
	imports: [MaterialModule, ReactiveFormsModule],
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
	readonly #heroesService = inject(HeroesService)
	readonly #destroyRef = inject(DestroyRef)
	readonly #router = inject(Router)
	readonly #dialog = inject(MatDialog)
	readonly #snackBar = inject(MatSnackBar)

	readonly displayedColumns: string[] = ['id', 'name', 'gender', 'actions']
	readonly dataSources = signal(new MatTableDataSource<Datasource>([]))
	readonly paginator = viewChild(MatPaginator)

	readonly searchControl = new FormControl<string>('')
	readonly searchElement = viewChild.required<ElementRef<HTMLInputElement>>('searchElement')

	constructor() {
		afterNextRender(() => {
			this.#getHeroes()
		})

		this.searchControl.valueChanges
			.pipe(debounceTime(500), takeUntilDestroyed(this.#destroyRef))
			.subscribe((value) => {
				if (value) this.#getHeroes({ filterBy: value, focus: true })
				else this.#getHeroes({ focus: true })
				this.searchElement().nativeElement.blur()
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

	#getHeroes(
		{ filterBy, focus }: { filterBy?: string; focus?: boolean } = { filterBy: '', focus: false },
	) {
		this.#heroesService
			.getHeroes({ filterBy })
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: ({ heroes }) => {
					this.#updateDatasource({ heroes })
					if (focus) this.searchElement().nativeElement.focus()
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
			.pipe(
				takeUntilDestroyed(this.#destroyRef),
				finalize(() => this.#getHeroes()),
			)
			.subscribe({
				next: ({ message }) => {
					this.#openSnackBar({ message, duration: 3000, panelClass: ['snackbar-green'] })
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
