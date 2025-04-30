// Shared Imports
import { Component, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
// This Component Imports
import { TransformToUppercaseDirective } from './transform-to-uppercase.directive'

@Component({
	template: `<input type="text" [formControl]="control" appTransformToUppercase />`,
	standalone: true,
	imports: [ReactiveFormsModule, TransformToUppercaseDirective],
})
class HostComponent {
	control = new FormControl('')
}

describe('TransformToUppercaseDirective', () => {
	let fixture: ComponentFixture<HostComponent>
	let inputEl: DebugElement
	let hostComponent: HostComponent

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HostComponent, ReactiveFormsModule, TransformToUppercaseDirective],
		}).compileComponents()

		fixture = TestBed.createComponent(HostComponent)
		hostComponent = fixture.componentInstance
		inputEl = fixture.debugElement.query(By.directive(TransformToUppercaseDirective))
	})

	test('should create an instance via host component', () => {
		fixture.detectChanges()
		expect(inputEl).toBeTruthy()
	})

	test('should transform initial value to uppercase on init', () => {
		const initialValue = 'initial text'
		hostComponent.control.setValue(initialValue)
		fixture.detectChanges()

		expect(inputEl.nativeElement.value).toBe(initialValue.toUpperCase())
		expect(hostComponent.control.value).toBe(initialValue.toUpperCase())
	})

	test('should transform typed value to uppercase on input event', () => {
		fixture.detectChanges()
		const typedValue = 'typed text'
		const inputElement = inputEl.nativeElement as HTMLInputElement

		inputElement.value = typedValue
		inputElement.dispatchEvent(new Event('input'))
		fixture.detectChanges()

		expect(inputElement.value).toBe(typedValue.toUpperCase())
		expect(hostComponent.control.value).toBe(typedValue.toUpperCase())
	})

	test('should NOT emit valueChanges event when transforming value', () => {
		fixture.detectChanges()
		const spy = jest.fn()
		hostComponent.control.valueChanges.subscribe(spy)

		const typedValue = 'another text'
		const inputElement = inputEl.nativeElement as HTMLInputElement
		inputElement.value = typedValue
		inputElement.dispatchEvent(new Event('input'))
		fixture.detectChanges()

		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toHaveBeenCalledWith('another text') // minúsculas
		expect(hostComponent.control.value).toBe('ANOTHER TEXT') // mayúsculas
		expect(hostComponent.control.value).toBe(typedValue.toUpperCase())
	})

	test('should handle non-string initial value gracefully', () => {
		/* eslint-disable @typescript-eslint/no-explicit-any */
		hostComponent.control.setValue(123 as any)
		fixture.detectChanges()

		expect(inputEl.nativeElement.value).toBeDefined()
		expect(hostComponent.control.value).toBe(123)
	})
})
