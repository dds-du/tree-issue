import { NgModule, Component } from "@angular/core";
import { IndexComponent } from './index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';

const routes: Routes = [
    { path: 'root', component: IndexComponent },
    { path: '', redirectTo: 'root', pathMatch: 'full' }
]

@NgModule({
    declarations: [ IndexComponent ],
    imports: [ 
        SharedModule,
        RouterModule.forChild(routes),
        NgxEchartsModule.forChild()
    ]
})

export class IndexModule {}