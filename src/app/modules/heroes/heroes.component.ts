// Angular Imports
import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
	standalone: true,
	selector: 'app-heroes',
	imports: [RouterOutlet],
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {}
