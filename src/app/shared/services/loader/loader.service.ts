// Angular Imports
import { Injectable } from '@angular/core'
// Thirdparty Imports
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	#loading = new BehaviorSubject<boolean>(false)

	isLoading(): Observable<boolean> {
		return this.#loading.asObservable()
	}

	turnOnLoader(): void {
		this.#loading.next(true)
	}

	turnOffLoader(): void {
		this.#loading.next(false)
	}
}
