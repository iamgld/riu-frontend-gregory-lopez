// Angular Imports
import { type ComponentFixture, TestBed } from '@angular/core/testing'
// This Component Imports
import { LoaderComponent } from './loader.component'
import { Component } from '@angular/core'

@Component({
	template: `<app-loader [loading]="loading" />`,
	standalone: true,
	imports: [LoaderComponent],
})
class HostComponent {
	loading = false
}

describe('LoaderComponent', () => {
	let component: LoaderComponent
	let fixture: ComponentFixture<LoaderComponent>
	let hostFixture: ComponentFixture<HostComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LoaderComponent, HostComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(LoaderComponent)
		component = fixture.componentInstance
		fixture.detectChanges()

		hostFixture = TestBed.createComponent(HostComponent)
		hostFixture.detectChanges()
	})

	test('should be create', () => {
		expect(component).toBeTruthy()
	})

	test('should add class "loader--loading" when loading is true', () => {
		hostFixture.componentInstance.loading = true
		hostFixture.detectChanges()
		const loaderElement = hostFixture.nativeElement.querySelector('article.loader')
		expect(loaderElement.classList.contains('loader--loading')).toBe(true)
	})

	test('should NOT add class "loader--loading" when loading is false', () => {
		hostFixture.componentInstance.loading = false
		hostFixture.detectChanges()
		const loaderElement = hostFixture.nativeElement.querySelector('article.loader')
		expect(loaderElement.classList.contains('loader--loading')).toBe(false)
	})
})
