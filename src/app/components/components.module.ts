import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ComSelectComponent } from './com-select/com-select.component'; // 下拉组件
import { ComInputComponent } from './com-input/com-input.component';
import { ComTableComponent } from './com-table/com-table.component';
import { ComSiderComponent } from './com-sider/com-sider.component';
import { ComTreeComponent } from './com-tree/com-tree.component';
import { ComTimeComponent } from './com-time/com-time.component';

@NgModule({
	declarations: [
		ComSelectComponent,
		ComInputComponent,
		ComTableComponent,
		ComSiderComponent,
		ComTreeComponent,
		ComTimeComponent
	],
	imports: [ SharedModule ],
	exports: [
		ComSelectComponent,
		ComInputComponent,
		ComTableComponent,
		ComSiderComponent,
		ComTreeComponent,
		ComTimeComponent
	]
})
export class ComponentsModule {}