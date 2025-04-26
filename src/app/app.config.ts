// Angular Imports
import { ApplicationConfig } from '@angular/core'
import {
	provideRouter,
	withComponentInputBinding,
	withViewTransitions,
	withInMemoryScrolling,
} from '@angular/router'
import { provideClientHydration } from '@angular/platform-browser'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
// This Module Imports
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
	providers: [
		provideClientHydration(),
		provideRouter(
			routes,
			withComponentInputBinding(),
			withViewTransitions(),
			withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' }),
		),
		provideAnimations(),
		provideAnimationsAsync(),
		provideHttpClient(withFetch()),
	],
}
