// Angular Imports
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
// Shared Imports
import { MaterialModule } from '@shared/modules'

@Component({
	standalone: true,
	selector: 'app-root',
	imports: [RouterOutlet, RouterLink, MaterialModule],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
