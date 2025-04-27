// Angular Imports
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

// Regex para validar slugs tipo "name-last-33" (letras y números separados por guiones, sin espacios ni caracteres especiales)
const SLUG_REGEX = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/

export function isSlugValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value

		if (!value) return null

		if (SLUG_REGEX.test(value)) return null
		return {
			slug: 'This field must be a valid slug: only letters, numbers, and hyphens allowed, no spaces or special characters!',
		}
	}
}
