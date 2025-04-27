// Angular Imports
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import {
	FormControl,
	FormGroup,
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips'
// This Module Imports
import { HeroGender } from '@heroes/models'
// Shared Imports
import { MaterialModule } from '@shared/modules'
import { isNaturalNumberValidator, isSlugValidator, isUrlValidator } from '@shared/validators'

@Component({
	selector: 'app-new-hero',
	standalone: true,
	imports: [ReactiveFormsModule, MaterialModule],
	templateUrl: './new-hero.component.html',
	styleUrl: './new-hero.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewHeroComponent {
	readonly #fb = inject(NonNullableFormBuilder)

	readonly HeroGender = HeroGender
	readonly addOnBlur = true
	readonly separatorKeysCodes = [ENTER, COMMA] as const
	readonly aliases = signal<string[]>([])

	form: FormGroup<Form> = this.#fb.group<Form>({
		id: this.#fb.control('', {
			validators: [
				Validators.required,
				Validators.min(0),
				Validators.max(9999),
				isNaturalNumberValidator(),
			],
		}),
		slug: this.#fb.control('', { validators: [Validators.required, isSlugValidator()] }),
		name: this.#fb.control('', {
			validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
		}),
		gender: this.#fb.control('', { validators: [Validators.required] }),
		image: this.#fb.control('', { validators: [Validators.required, isUrlValidator()] }),
		work: this.#fb.control('', {
			validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
		}),
		biography: this.#fb.group<FormBiography>({
			fullName: this.#fb.control('', {
				validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
			}),
			alterEgos: this.#fb.control('', {
				validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
			}),
			firstAppearance: this.#fb.control('', {
				validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
			}),
			publisher: this.#fb.control('', {
				validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
			}),
		}),
	})

	submit() {
		if (this.form.valid) {
			console.log('Value:', this.form.value)
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
