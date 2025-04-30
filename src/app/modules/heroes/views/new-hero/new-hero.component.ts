// Angular Imports
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'
import {
	FormControl,
	FormGroup,
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips'
import { MatSnackBar } from '@angular/material/snack-bar'
// This Module Imports
import { Hero, HeroGender } from '@heroes/models'
import { HeroesService } from '@heroes/services'
// Shared Imports
import { MaterialModule } from '@shared/modules'
import { TransformToUppercaseDirective } from '@shared/directives'
import { isNaturalNumberValidator, isSlugValidator, isUrlValidator } from '@shared/validators'

@Component({
	selector: 'app-new-hero',
	standalone: true,
	imports: [ReactiveFormsModule, MaterialModule, TransformToUppercaseDirective],
	templateUrl: './new-hero.component.html',
	styleUrl: './new-hero.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewHeroComponent {
	readonly #fb = inject(NonNullableFormBuilder)
	readonly #heroesService = inject(HeroesService)
	readonly #router = inject(Router)
	readonly #snackBar = inject(MatSnackBar)
	readonly #destroyRef = inject(DestroyRef)

	readonly HeroGender = HeroGender
	readonly addOnBlur = true
	readonly separatorKeysCodes = [ENTER, COMMA] as const
	readonly aliases = signal<string[]>(['batman'])

	form: FormGroup<Form> = this.#fb.group<Form>({
		id: this.#fb.control('111', {
			validators: [
				Validators.required,
				Validators.min(0),
				Validators.max(9999),
				isNaturalNumberValidator(),
			],
		}),
		slug: this.#fb.control('111-angel', { validators: [Validators.required, isSlugValidator()] }),
		name: this.#fb.control('angel dust', {
			validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
		}),
		gender: this.#fb.control(HeroGender.female, { validators: [Validators.required] }),
		image: this.#fb.control('https://imagen.com', {
			validators: [Validators.required, isUrlValidator()],
		}),
		work: this.#fb.control('mercenary', {
			validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
		}),
		biography: this.#fb.group<FormBiography>({
			fullName: this.#fb.control('chistina dust', {
				validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
			}),
			alterEgos: this.#fb.control('archangel', {
				validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
			}),
			firstAppearance: this.#fb.control('moclock 2001', {
				validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
			}),
			publisher: this.#fb.control('marvel commig', {
				validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
			}),
		}),
	})

	submit() {
		if (this.form.valid) {
			const hero: Hero = {
				id: Number(this.form.value.id),
				name: this.form.value.name ?? '',
				slug: this.form.value.slug ?? '',
				gender: this.form.value.gender as HeroGender,
				image: this.form.value.image ?? '',
				work: this.form.value.work ?? '',
				biography: {
					fullName: this.form.value.biography?.fullName ?? '',
					alterEgos: this.form.value.biography?.alterEgos ?? '',
					aliases: this.aliases(),
					firstAppearance: this.form.value.biography?.firstAppearance ?? '',
					publisher: this.form.value.biography?.publisher ?? '',
				},
			}
			this.#addNewHero({ hero })
		} else {
			this.form.markAllAsTouched()
		}
	}

	addAlias(event: MatChipInputEvent): void {
		const value = (event.value || '').trim()
		// Add our aliases
		if (value) {
			this.aliases.update((aliases) => [...aliases, value])
		}
		// Clear the input value
		event.chipInput!.clear()
	}

	removeAlias(alias: string): void {
		this.aliases.update((aliases) => {
			const index = aliases.indexOf(alias)
			if (index < 0) {
				return aliases
			}

			aliases.splice(index, 1)
			return [...aliases]
		})
	}

	editAlias(alias: string, event: MatChipEditedEvent) {
		const value = event.value.trim()
		// Remove alias if it no longer has a name
		if (!value) {
			this.removeAlias(alias)
			return
		}

		// Edit existing alias
		this.aliases.update((aliases) => {
			const index = aliases.indexOf(alias)
			if (index >= 0) {
				aliases[index] = value
				return [...aliases]
			}
			return aliases
		})
	}

	#addNewHero({ hero }: { hero: Hero }) {
		this.#heroesService
			.addHero({ hero })
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: ({ message }) => {
					this.#openSnackBar({ message, duration: 3000, panelClass: ['snackbar-green'] })
					this.#router.navigate(['/heroes'])
				},
				error: (error) => {
					if (error.errorCode === 'id') {
						this.form.controls.id.reset()
						this.form.controls.id.markAsTouched()
					}
					if (error.errorCode === 'slug') {
						this.form.controls.slug.reset()
						this.form.controls.slug.markAsTouched()
					}
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

interface Form {
	id: FormControl<string>
	slug: FormControl<string>
	name: FormControl<string>
	gender: FormControl<string>
	image: FormControl<string>
	work: FormControl<string>
	biography: FormGroup<FormBiography>
}

interface FormBiography {
	fullName: FormControl<string>
	alterEgos: FormControl<string>
	firstAppearance: FormControl<string>
	publisher: FormControl<string>
}
