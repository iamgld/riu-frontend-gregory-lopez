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
		/* agrega métodos mock si es necesario */
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
})
