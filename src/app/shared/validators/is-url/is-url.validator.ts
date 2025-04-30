// Angular Imports
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

// Regex para validar URLs básicas
const URL_REGEX = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/

export function isUrlValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value

		if (!value) return null

		if (URL_REGEX.test(value)) return null
		return {
			url: 'This field must be a valid url!',
		}
	}
}
