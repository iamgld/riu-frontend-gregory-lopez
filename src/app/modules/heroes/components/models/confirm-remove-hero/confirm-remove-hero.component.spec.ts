import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ConfirmRemoveHeroComponent } from './confirm-remove-hero.component'

describe('ConfirmRemoveHeroComponent', () => {
	let component: ConfirmRemoveHeroComponent
	let fixture: ComponentFixture<ConfirmRemoveHeroComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ConfirmRemoveHeroComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(ConfirmRemoveHeroComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
