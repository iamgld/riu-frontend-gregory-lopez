// Angular Imports
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
// This Component Imports
import { HeroComponent } from './hero.component'
// This Module Imports
import { HeroesService } from '@heroes/services'
import { LoaderService } from '@shared/services'
// Shared Imports
import { MaterialModule } from '@shared/modules'

describe('HeroComponent', () => {
	let component: HeroComponent
	let fixture: ComponentFixture<HeroComponent>

	const mockHeroesService = {
		getHero: jest.fn(),
		getHeroes: jest.fn(),
		addHero: jest.fn(),
		editHero: jest.fn(),
		removeHero: jest.fn(),
	}
	const mockLoaderService = { turnOnLoader: jest.fn(), turnOffLoader: jest.fn() }
	const mockRouter = { navigate: jest.fn() }
	const mockSnackBar = { open: jest.fn() }
	const mockDialog = { open: jest.fn() }

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MaterialModule, HeroComponent, NoopAnimationsModule],
			providers: [
				{ provide: HeroesService, useValue: mockHeroesService },
				{ provide: LoaderService, useValue: mockLoaderService },
				{ provide: Router, useValue: mockRouter },
				{ provide: MatSnackBar, useValue: mockSnackBar },
				{ provide: MatDialog, useValue: mockDialog },
			],
		}).compileComponents()

		fixture = TestBed.createComponent(HeroComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	test('should be create', () => {
		expect(component).toBeTruthy()
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

	test('should edit alias', () => {
		component.aliases.set(['alias1', 'alias2'])
		const event = { value: 'edited-alias' }
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		component.editAlias('alias1', event as any)
		expect(component.aliases()).toEqual(['edited-alias', 'alias2'])
	})
})
