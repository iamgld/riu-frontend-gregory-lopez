// Angular Imports
import { NgModule } from '@angular/core'
// Thirdparty Imports
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatChipsModule } from '@angular/material/chips'
import { MatSnackBarModule } from '@angular/material/snack-bar'

const modules = [
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatTableModule,
	MatPaginatorModule,
	MatTooltipModule,
	MatPaginatorModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatChipsModule,
	MatSnackBarModule,
]

@NgModule({
	declarations: [],
	imports: [...modules],
	exports: [...modules],
})
export class MaterialModule {}
