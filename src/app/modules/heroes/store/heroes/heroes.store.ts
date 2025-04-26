// Store Imports
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'

export interface HeroesState {
	showSidenav: boolean
}

export const heroesInitialState: HeroesState = {
	showSidenav: false,
}

export const HeroesStore = signalStore(
	withState(heroesInitialState),
	withMethods((store) => ({
		openSidenav: (): void => {
			patchState(store, () => ({ showSidenav: true }))
		},
		closeSidenav: (): void => {
			patchState(store, () => ({ showSidenav: false }))
		},
	})),
)
