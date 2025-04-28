// Angular Imports
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
// Shared Imports
import { MaterialModule } from '@shared/modules'
import { LoaderComponent } from '@shared/components'
import { LoaderService } from '@shared/services'

const components = [LoaderComponent]

@Component({
	standalone: true,
	selector: 'app-root',
	imports: [RouterOutlet, RouterLink, MaterialModule, ...components],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	readonly #loaderService = inject(LoaderService)
	readonly #destroyRef = inject(DestroyRef)

	loading = signal(false)

	constructor() {
		this.#loaderService
			.isLoading()
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: (isLoading) => {
					this.loading.set(isLoading)
				},
				error: (error) => {
					console.error('Error fetching loader:', error)
					this.loading.set(false)
				},
			})
	}
}
