import { HomeComponent } from './home.component';
import { AuthGuardService } from 'src/app/shared/services/guard.service';
import { ErrorComponent } from '../error/error.component';
import { Routes, RouterModule } from '@angular/router';

const HOME_ROUTE: Routes = [
	{
		path: '', component: HomeComponent, 
		canActivateChild: [AuthGuardService],
		children: [
			//平台首页
			{ 
				path: 'index', 
				loadChildren: () => import( /* webpackChunkName: "index" */ '../index/index.module')
				.then(m => m.IndexModule) 
			},

			// 基础信息模块
			{ 
				path: 'base_info', 
				loadChildren: () => import( /* webpackChunkName: "base_info" */ '../base_info/base_info.motule')
				.then(m => m.BaseInfoModule) 
			},

			//默认跳转到首页
			{ path: '', pathMatch: 'full',  redirectTo: 'index' },
			//没有捕获到url时跳转错误页面
			{ path: '**', component: ErrorComponent }
		]
	}
];

export const HomeRoutingModule = RouterModule.forChild(HOME_ROUTE);