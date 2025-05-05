// Angular Imports
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
// This Component Imports
import { NewHeroComponent } from './new-hero.component'
// This Module Imports
import { HeroesService } from '@heroes/services'
import { LoaderService } from '@shared/services'

describe('NewHeroComponent', () => {
	let component: NewHeroComponent
	let fixture: ComponentFixture<NewHeroComponent>

	const mockHeroesService = {
		addHero: jest.fn(),
	}
	const mockLoaderService = { turnOnLoader: jest.fn(), turnOffLoader: jest.fn() }
	const mockRouter = { navigate: jest.fn() }
	const mockSnackBar = { open: jest.fn() }
	const mockDialog = { open: jest.fn() }

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NewHeroComponent, NoopAnimationsModule],
			providers: [
				{ provide: HeroesService, useValue: mockHeroesService },
				{ provide: LoaderService, useValue: mockLoaderService },
				{ provide: Router, useValue: mockRouter },
				{ provide: MatSnackBar, useValue: mockSnackBar },
				{ provide: MatDialog, useValue: mockDialog },
			],
		}).compileComponents()

		fixture = TestBed.createComponent(NewHeroComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	test('should be create', () => {
		expect(component).toBeTruthy()
	})

	test('should have invalid form when required fields are empty', () => {
		component.form.controls.id.setValue('')
		component.form.controls.name.setValue('')
		component.form.controls.slug.setValue('')
		component.form.controls.gender.setValue('')
		component.form.controls.image.setValue('')
		component.form.controls.work.setValue('')
		component.form.controls.biography.controls.fullName.setValue('')
		component.form.controls.biography.controls.alterEgos.setValue('')
		component.form.controls.biography.controls.firstAppearance.setValue('')
		component.form.controls.biography.controls.publisher.setValue('')
		expect(component.form.valid).toBe(false)
	})

	test('should add alias', () => {
		const event = { value: 'new-alias', chipInput: { clear: jest.fn() } }
		component.aliases.set([])
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		component.addAlias(event as any)
		expect(component.aliases().includes('new-alias')).toBe(true)
	})

	test('should remove alias', () => {
		component.aliases.set(['alias1', 'alias2'])
		component.removeAlias('alias1')
		expect(component.aliases()).toEqual(['alias2'])
	})

	test('should call addHero and navigate on valid submit', () => {
		component.form.controls.id.setValue('123')
		component.form.controls.name.setValue('Batman')
		component.form.controls.slug.setValue('batman')
		component.form.controls.gender.setValue('male')
		component.form.controls.image.setValue('https://image.com')
		component.form.controls.work.setValue('Detective')
		component.form.controls.biography.controls.fullName.setValue('Bruce Wayne')
		component.form.controls.biography.controls.alterEgos.setValue('Matches Malone')
		component.form.controls.biography.controls.firstAppearance.setValue('Detective Comics #27')
		component.form.controls.biography.controls.publisher.setValue('DC Comics')
		component.aliases.set(['alias1'])
		mockHeroesService.addHero = jest.fn(() => ({
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			pipe: () => ({ subscribe: ({ next }: any) => next({ message: 'ok' }) }),
		}))
		component.submit()
		expect(mockHeroesService.addHero).toHaveBeenCalled()
		expect(mockRouter.navigate).toHaveBeenCalledWith(['/heroes'])
	})

	test('should mark form as touched if invalid on submit', () => {
		component.form.controls.id.setValue('')
		const markAllAsTouchedSpy = jest.spyOn(component.form, 'markAllAsTouched')
		component.submit()
		expect(markAllAsTouchedSpy).toHaveBeenCalled()
	})
})
