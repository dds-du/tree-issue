import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'src/app/shared/custom.echarts';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedModule,
        NgxEchartsModule.forRoot({ echarts }),
        HomeRoutingModule
    ]
})
export class HomeModule {}