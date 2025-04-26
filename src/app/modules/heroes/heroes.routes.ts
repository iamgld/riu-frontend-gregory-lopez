// Angular Imports
import { Routes } from '@angular/router'
// This Module Imports
import { HeroesComponent } from './heroes.component'
import { EditHeroComponent, HeroComponent, NewHeroComponent } from './views'
import { HeroesService } from './services'
import { HeroesStore } from './store'

const services = [HeroesService]
const stores = [HeroesStore]

export const HEROES_ROUTES: Routes = [
	{
		path: '',
		component: HeroesComponent,
		providers: [...services, ...stores],
		children: [
			{
				path: 'new',
				component: NewHeroComponent,
			},
			{
				path: ':id',
				component: HeroComponent,
			},
			{
				path: ':id/edit',
				component: EditHeroComponent,
			},
		],
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full',
	},
]
