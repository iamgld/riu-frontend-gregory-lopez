// Angular Imports
import { Routes } from '@angular/router'
// This Module Imports
import { HeroesComponent } from './heroes.component'
import { EditHeroComponent, HeroComponent, NewHeroComponent } from './views'
import { HeroesService } from './services'

export const HEROES_ROUTES: Routes = [
	{
		path: '',
		component: HeroesComponent,
		providers: [HeroesService],
	},
	{
		path: 'new',
		component: NewHeroComponent,
		providers: [HeroesService],
	},
	{
		path: ':id',
		component: HeroComponent,
		providers: [HeroesService],
	},
	{
		path: ':id/edit',
		component: EditHeroComponent,
		providers: [HeroesService],
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full',
	},
]
