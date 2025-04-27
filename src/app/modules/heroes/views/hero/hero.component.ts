// Angular Imports
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	numberAttribute,
	signal,
	afterNextRender,
} from '@angular/core'
import {
	FormControl,
	FormGroup,
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips'
import { MatSnackBar } from '@angular/material/snack-bar'
// This Module Imports
import { Hero, HeroGender } from '@heroes/models'
import { HeroesService } from '@heroes/services'
// Shared Imports
import { MaterialModule } from '@shared/modules'
import { isNaturalNumberValidator, isSlugValidator, isUrlValidator } from '@shared/validators'

@Component({
	selector: 'app-hero',
	standalone: true,
	imports: [ReactiveFormsModule, MaterialModule],
	templateUrl: './hero.component.html',
	styleUrl: './hero.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
	readonly #fb = inject(NonNullableFormBuilder)
	readonly #heroesService = inject(HeroesService)
	readonly #router = inject(Router)
	readonly #snackBar = inject(MatSnackBar)

	readonly HeroGender = HeroGender
	readonly addOnBlur = true
	readonly separatorKeysCodes = [ENTER, COMMA] as const
	readonly aliases = signal<string[]>([])

	readonly heroId = input<number, string>(0, { transform: numberAttribute })
	readonly invalidHeroId = computed(() => this.Number.isNaN(this.heroId()))
	readonly currentHero = signal<Hero | null>(null)
	readonly Number = Number

	form: FormGroup<Form> = this.#fb.group<Form>({
		id: this.#fb.control(
			{ value: '', disabled: true },
			{
				validators: [
					Validators.required,
					Validators.min(0),
					Validators.max(9999),
					isNaturalNumberValidator(),
				],
			},
		),
		slug: this.#fb.control(
			{ value: '', disabled: true },
			{ validators: [Validators.required, isSlugValidator()] },
		),
		name: this.#fb.control(
			{ value: '', disabled: true },
			{
				validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
			},
		),
		gender: this.#fb.control({ value: '', disabled: true }, { validators: [Validators.required] }),
		image: this.#fb.control(
			{ value: '', disabled: true },
			{
				validators: [Validators.required, isUrlValidator()],
			},
		),
		work: this.#fb.control(
			{ value: '', disabled: true },
			{
				validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
			},
		),
		biography: this.#fb.group<FormBiography>({
			fullName: this.#fb.control(
				{ value: '', disabled: true },
				{
					validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
				},
			),
			alterEgos: this.#fb.control(
				{ value: '', disabled: true },
				{
					validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
				},
			),
			alias: this.#fb.control(
				{ value: '', disabled: true },
				{
					validators: [Validators.required],
				},
			),
			firstAppearance: this.#fb.control(
				{ value: '', disabled: true },
				{
					validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
				},
			),
			publisher: this.#fb.control(
				{ value: '', disabled: true },
				{
					validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
				},
			),
		}),
	})

	constructor() {
		afterNextRender(() => {
			if (!this.invalidHeroId()) this.#getHero({ heroId: this.heroId() })
		})
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

	goToEdit({ heroId }: { heroId: number }) {
		this.#router.navigate(['/heroes', heroId, 'edit'])
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

	#getHero({ heroId }: { heroId: number }) {
		this.#heroesService.getHero({ heroId }).subscribe({
			next: ({ hero }) => {
				// console.log('hero', hero)
				this.currentHero.set(hero)
				this.#updateForm({ hero })
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

	#updateForm({ hero }: { hero: Hero }) {
		this.form.patchValue({
			id: String(hero.id),
			slug: hero.slug,
			name: hero.name,
			gender: hero.gender,
			image: hero.image,
			work: hero.work,
			biography: {
				fullName: hero.biography.fullName,
				alterEgos: hero.biography.alterEgos,
				firstAppearance: hero.biography.firstAppearance,
				publisher: hero.biography.publisher,
			},
		})
		this.aliases.set(hero.biography.aliases)
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
	alias: FormControl<string>
	firstAppearance: FormControl<string>
	publisher: FormControl<string>
}
