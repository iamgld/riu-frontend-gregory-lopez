// Angular Imports
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
// Shared Imports
import { MaterialModule } from '@shared/modules'

@Component({
	selector: 'app-confirm-remove-hero',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './confirm-remove-hero.component.html',
	styleUrl: './confirm-remove-hero.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmRemoveHeroComponent {
	readonly data = inject<{ heroId: number }>(MAT_DIALOG_DATA)
}
