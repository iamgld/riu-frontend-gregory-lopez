// Angular Imports
import { NgModule } from '@angular/core'
// Thirdparty Imports
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatPaginatorModule } from '@angular/material/paginator'

const modules = [
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatTableModule,
	MatPaginatorModule,
	MatTooltipModule,
	MatPaginatorModule,
]

@NgModule({
	declarations: [],
	imports: [...modules],
	exports: [...modules],
})
export class MaterialModule {}
