// Angular Imports
import { NgModule } from '@angular/core'
// Thirdparty Imports
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

const modules = [MatToolbarModule, MatIconModule, MatButtonModule]

@NgModule({
	declarations: [],
	imports: [...modules],
	exports: [...modules],
})
export class MaterialModule {}
