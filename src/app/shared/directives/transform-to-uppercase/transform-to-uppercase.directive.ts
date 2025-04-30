// Angular Imports
import { AfterViewInit, Directive, ElementRef, HostListener, inject } from '@angular/core'
import { NgControl } from '@angular/forms'

@Directive({
	standalone: true,
	selector: '[appTransformToUppercase]',
})
export class TransformToUppercaseDirective implements AfterViewInit {
	readonly #host = inject(ElementRef)
	readonly #control = inject(NgControl)

	ngAfterViewInit() {
		const value = this.#control.control?.value
		this.#transformToUppercase(value)
	}

	@HostListener('input', ['$event.target.value'])
	/* eslint-disable @typescript-eslint/no-explicit-any */
	transformToUppercase(value: any) {
		this.#transformToUppercase(value)
	}

	/* eslint-disable @typescript-eslint/no-explicit-any */
	#transformToUppercase(value: any) {
		if (typeof value !== 'string') return

		const transformedValue = value.toUpperCase()

		this.#host.nativeElement.value = transformedValue

		this.#control.control?.setValue(transformedValue, {
			emitEvent: false,
		})
	}
}
