import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
	NzButtonModule, 
	NzIconModule, 
	NzGridModule, 
	NzMenuModule, 
	NzInputModule, 
	NzSelectModule, 
	NzModalModule, 
	NzMessageModule, 
	NzSpinModule, 
	NzPopconfirmModule, 
	NzTableModule, 
	NzInputNumberModule, 
	NzDropDownModule, 
	NzTreeModule, 
	NzRadioModule, 
	NzTimePickerModule,
	NzDatePickerModule
} from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestDirective } from '../directives/test.directive';
import { StatusPipe } from '../pipes/public.pipe';

@NgModule({
	declarations: [
		TestDirective,
		StatusPipe
	],
	imports: [
		
	],
	exports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		TestDirective,
		StatusPipe,

		NzButtonModule,
		NzIconModule,
		NzGridModule,
		NzMenuModule,
		NzInputModule,
		NzSelectModule,
		NzModalModule,
		NzMessageModule,
		NzSpinModule,
		NzPopconfirmModule,
		NzTableModule,
		NzInputNumberModule,
		NzDropDownModule,
		NzTreeModule,
		NzRadioModule,
		NzTimePickerModule,
		NzDatePickerModule
		
	]
})
export class SharedModule {
}
