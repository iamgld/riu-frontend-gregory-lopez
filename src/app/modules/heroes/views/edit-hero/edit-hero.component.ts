import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-edit-hero',
	standalone: true,
	imports: [],
	templateUrl: './edit-hero.component.html',
	styleUrl: './edit-hero.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditHeroComponent {}
