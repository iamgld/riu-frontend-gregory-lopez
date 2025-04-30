// Angular Imports
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { By } from '@angular/platform-browser'
// This Component Imports
import { HeroesComponent } from './heroes.component'
// This Module Imports
import { HeroesService } from '@heroes/services'
// Shared Imports
import { LoaderService } from '@shared/services'
// Thirdparty Imports
import { of } from 'rxjs'

describe('HeroesComponent', () => {
	let component: HeroesComponent
	let fixture: ComponentFixture<HeroesComponent>

	const mockHeroes = [
		{ id: 1, name: 'Batman', gender: 'male', slug: 'batman', biography: {}, image: '', work: '' },
		{
			id: 2,
			name: 'Wonder Woman',
			gender: 'female',
			slug: 'wonder-woman',
			biography: {},
			image: '',
			work: '',
		},
	]

	const mockHeroesService = {
		getHeroes: jest.fn(({ filterBy } = {}) => {
			if (!filterBy) return of({ heroes: mockHeroes })
			const filtered = mockHeroes.filter((h) =>
				h.name.toLowerCase().includes(filterBy.toLowerCase()),
			)
			return of({ heroes: filtered })
		}),
	}

	const mockLoaderService = { turnOnLoader: jest.fn(), turnOffLoader: jest.fn() }

	const mockDialog = {
		open: jest.fn(),
	}

	const mockSnackBar = {
		open: jest.fn(),
	}

	const mockRouter = {
		navigate: jest.fn(),
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, NoopAnimationsModule, HeroesComponent],
			providers: [
				{ provide: HeroesService, useValue: mockHeroesService },
				{ provide: LoaderService, useValue: mockLoaderService },
				{ provide: MatDialog, useValue: mockDialog },
				{ provide: MatSnackBar, useValue: mockSnackBar },
				{ provide: Router, useValue: mockRouter },
			],
		})
		fixture = TestBed.createComponent(HeroesComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	test('should be create', () => {
		expect(component).toBeTruthy()
	})

	test('should render the table of heroes', fakeAsync(() => {
		fixture.detectChanges()
		tick()
		const rows = fixture.nativeElement.querySelectorAll('table.heroes__table tr.mat-mdc-row')
		expect(rows.length).toBe(mockHeroes.length)
	}))

	test('should render action buttons for each hero', fakeAsync(() => {
		fixture.detectChanges()
		tick()
		const actionButtons = fixture.nativeElement.querySelectorAll('.heroes__table__actions button')
		expect(actionButtons.length).toBe(mockHeroes.length * 3)
	}))

	// FIXME:
	// test('should filter heroes when typing in the search input', fakeAsync(() => {
	// 	fixture.detectChanges()
	// 	tick()
	// 	expect(
	// 		fixture.nativeElement.querySelectorAll('table.heroes__table tr.mat-mdc-row').length,
	// 	).toBe(2)
	// 	component.searchControl.setValue('batman')
	// 	// tick(500)
	// 	fixture.detectChanges()

	// 	const rows = fixture.nativeElement.querySelectorAll('table.heroes__table tr.mat-mdc-row')
	// 	expect(rows.length).toBe(1)
	// 	expect(rows[0].textContent).toContain('Batman')
	// }))

	test('should call viewHero when clicking the view button', fakeAsync(() => {
		jest.spyOn(component, 'viewHero')
		fixture.detectChanges()
		tick()
		const viewBtn = fixture.debugElement.queryAll(By.css('button[matTooltip="View Hero"]'))[0]
		viewBtn.triggerEventHandler('click')
		expect(component.viewHero).toHaveBeenCalledWith({ heroId: mockHeroes[0].id })
	}))

	test('should call editHero when clicking the edit button', fakeAsync(() => {
		jest.spyOn(component, 'editHero')
		fixture.detectChanges()
		tick()
		const editBtn = fixture.debugElement.queryAll(By.css('button[matTooltip="Edit Hero"]'))[0]
		editBtn.triggerEventHandler('click')
		expect(component.editHero).toHaveBeenCalledWith({ heroId: mockHeroes[0].id })
	}))

	test('should call openRemoveHeroDialog when clicking the remove button', fakeAsync(() => {
		jest.spyOn(component, 'openRemoveHeroDialog')
		fixture.detectChanges()
		tick()
		const removeBtn = fixture.debugElement.queryAll(By.css('button[matTooltip="Remove Hero"]'))[0]
		removeBtn.triggerEventHandler('click')
		expect(component.openRemoveHeroDialog).toHaveBeenCalledWith({ heroId: mockHeroes[0].id })
	}))

	test('should show empty table if there are no heroes', fakeAsync(() => {
		mockHeroesService.getHeroes.mockReturnValueOnce(of({ heroes: [] }))
		fixture = TestBed.createComponent(HeroesComponent)
		fixture.detectChanges()
		tick()
		const rows = fixture.nativeElement.querySelectorAll('table.heroes__table tr.mat-mdc-row')
		expect(rows.length).toBe(0)
	}))
})
