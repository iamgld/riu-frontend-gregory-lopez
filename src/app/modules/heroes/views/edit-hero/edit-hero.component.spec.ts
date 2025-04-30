// Angular Imports
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
// This Component Imports
import { EditHeroComponent } from './edit-hero.component'
// This Module Imports
import { HeroesService } from '@heroes/services'
import { LoaderService } from '@shared/services'

describe('EditHeroComponent', () => {
	let component: EditHeroComponent
	let fixture: ComponentFixture<EditHeroComponent>

	const mockHeroesService = {
		/* agrega métodos mock si es necesario */
	}
	const mockLoaderService = { turnOnLoader: jest.fn(), turnOffLoader: jest.fn() }
	const mockRouter = { navigate: jest.fn() }
	const mockSnackBar = { open: jest.fn() }
	const mockDialog = { open: jest.fn() }

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EditHeroComponent],
			providers: [
				{ provide: HeroesService, useValue: mockHeroesService },
				{ provide: LoaderService, useValue: mockLoaderService },
				{ provide: Router, useValue: mockRouter },
				{ provide: MatSnackBar, useValue: mockSnackBar },
				{ provide: MatDialog, useValue: mockDialog },
			],
		}).compileComponents()

		fixture = TestBed.createComponent(EditHeroComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	test('should be create', () => {
		expect(component).toBeTruthy()
	})
})
