// Angular Imports
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
// This Component Imports
import { ConfirmRemoveHeroComponent } from './confirm-remove-hero.component'
// Shared Imports
import { MaterialModule } from '@shared/modules'

describe('ConfirmRemoveHeroComponent', () => {
	let component: ConfirmRemoveHeroComponent
	let fixture: ComponentFixture<ConfirmRemoveHeroComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MaterialModule, ConfirmRemoveHeroComponent],
			providers: [{ provide: MAT_DIALOG_DATA, useValue: { heroId: 1 } }],
		}).compileComponents()

		fixture = TestBed.createComponent(ConfirmRemoveHeroComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	test('should be create', () => {
		expect(component).toBeTruthy()
	})
})
