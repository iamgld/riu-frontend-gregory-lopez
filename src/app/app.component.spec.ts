// Angular Imports
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
// This Component Imports
import { AppComponent } from './app.component'
// Shared Imports
import { MaterialModule } from '@shared/modules'

describe('AppComponent', () => {
	let component: AppComponent
	let fixture: ComponentFixture<AppComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MaterialModule],
			providers: [provideRouter([])],
		}).compileComponents()

		fixture = TestBed.createComponent(AppComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	test('should be create', () => {
		expect(component).toBeTruthy()
	})

	test('should render the title "Heroes" in the toolbar', () => {
		const compiled = fixture.nativeElement as HTMLElement
		const title = compiled.querySelector('.toolbar__section__title')
		expect(title?.textContent).toContain('Heroes')
	})

	test('should render the LoaderComponent', () => {
		const compiled = fixture.nativeElement as HTMLElement
		const loader = compiled.querySelector('app-loader')
		expect(loader).toBeTruthy()
	})

	test('should render the router-outlet inside LoaderComponent', () => {
		const compiled = fixture.nativeElement as HTMLElement
		const loader = compiled.querySelector('app-loader')
		const routerOutlet = loader?.querySelector('router-outlet')
		expect(routerOutlet).toBeTruthy()
	})
})
