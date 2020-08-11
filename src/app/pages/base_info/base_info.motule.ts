import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { FlytypeCopomnent } from './fly_type/fly_type.component';
import { AtaComponent } from './ata/ata.component';

const routes: Routes = [
    { path: 'fly_type', component: FlytypeCopomnent },
    { path: 'ata', component: AtaComponent },
    { path: '', redirectTo: 'fly_type', pathMatch: 'full' }
]
@NgModule({
    declarations: [ FlytypeCopomnent, AtaComponent ],
    imports: [
        SharedModule,
        ComponentsModule,
        RouterModule.forChild(routes)
    ]
})

export class BaseInfoModule { }