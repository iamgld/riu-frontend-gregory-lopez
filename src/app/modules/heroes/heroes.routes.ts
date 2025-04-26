// Angular Imports
import { Routes } from '@angular/router'
// This Module Imports
import { HeroesComponent } from './heroes.component'
import { EditHeroComponent, HeroComponent, NewHeroComponent } from './views'
import { HeroesService } from './services'

const services = [HeroesService]

export const HEROES_ROUTES: Routes = [
	{
		path: '',
		component: HeroesComponent,
		providers: [...services],
	},
	{
		path: 'new',
		component: NewHeroComponent,
		providers: [...services],
	},
	{
		path: ':id',
		component: HeroComponent,
		providers: [...services],
	},
	{
		path: ':id/edit',
		component: EditHeroComponent,
		providers: [...services],
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full',
	},
]
