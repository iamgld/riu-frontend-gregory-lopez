// Angular Imports
import { TestBed } from '@angular/core/testing'
// This Module Imports
import { LoaderService } from './loader.service'

describe('LoaderService', () => {
	let service: LoaderService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(LoaderService)
	})

	test('should be created', () => {
		expect(service).toBeTruthy()
	})

	test('should set loading to true when turnOnLoader is called', (done) => {
		service.isLoading().subscribe((value) => {
			if (value === true) done()
		})
		service.turnOnLoader()
	})

	test('should set loading to false when turnOffLoader is called', (done) => {
		service.turnOnLoader()
		service.isLoading().subscribe((value) => {
			if (value === false) done()
		})
		service.turnOffLoader()
	})
})
