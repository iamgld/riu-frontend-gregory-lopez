// Angular Imports
import { Routes } from '@angular/router'

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'heroes',
		pathMatch: 'full',
	},
	{
		path: 'heroes',
		loadChildren: () => import('./modules/heroes/heroes.routes').then((m) => m.HEROES_ROUTES),
		title: 'Heroes',
	},
	{
		path: '**',
		redirectTo: 'heroes',
		pathMatch: 'full',
	},
]
