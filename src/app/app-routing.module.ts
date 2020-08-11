import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LoginAuthGuardService } from 'src/app/shared/services/guard.service';
const routes: Routes = [
	{
		path: 'login', component: LoginComponent
	},
	{
		path: 'home', 
		loadChildren: () => import( /* webpackChunkName: "home" */ './pages/home/home.module').then(m => m.HomeModule),
		canLoad: [ LoginAuthGuardService ]
	},
	{
		path: '', pathMatch: 'full', redirectTo: 'login'
	},
	{
		path: '**', pathMatch: 'full', redirectTo: 'login'
	}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
