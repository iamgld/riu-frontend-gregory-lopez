import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-new-hero',
	standalone: true,
	imports: [],
	templateUrl: './new-hero.component.html',
	styleUrl: './new-hero.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewHeroComponent {}
