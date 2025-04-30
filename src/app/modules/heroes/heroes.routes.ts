// Angular Imports
import { Routes } from '@angular/router'
// This Module Imports
import { HeroesComponent } from './heroes.component'
import { EditHeroComponent, HeroComponent, NewHeroComponent } from './views'
import { HeroesService } from './services'

export const HEROES_ROUTES: Routes = [
	{
		path: '',
		providers: [HeroesService],
		children: [
			{
				path: '',
				component: HeroesComponent,
			},
			{
				path: 'new',
				component: NewHeroComponent,
			},
			{
				path: ':heroId',
				component: HeroComponent,
			},
			{
				path: ':heroId/edit',
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
