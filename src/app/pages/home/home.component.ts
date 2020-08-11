import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, NavigationError, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, ActivationEnd, ResolveEnd } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { PublicService } from 'src/app/shared/services/public.service';
import { navAnimate } from 'src/app/animations/main.animation';
import { ISubscription } from 'rxjs/Subscription';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { environment } from 'src/environments/environment';

const mockMenu = [
	{ 
		path: '/base_info', 
		title: '测试一级标题',
		children: [
			{
				path: '/base_info/fly_type',
				title: '测试页面1'
			},
			{
				path: '/base_info/ata',
				title: '测试页面2'
			}
		]
	}
];

@Component({
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.less' ],
	changeDetection: ChangeDetectionStrategy.Default,
	animations: [ navAnimate ]
})



export class HomeComponent implements OnInit {

	welcome = '欢迎来到公路客户化管理系统';
	navStatus: boolean = true;
	userInfo: any;
	navList: any[] = [];       //总菜单
	topmenuList: any[] = [];   //顶部一级菜单
	leftmenuList: any[] = [];  //左侧二级菜单
	options: Object;
	obrouter: ISubscription;
	mainNav: string = '';         //当前的一级菜单
	activeSubMenu: string | number = ''; //当前的二级菜单
	activeUrl: string = '';    //当前的完整路径
	isInit: boolean = false;   //是否初始化

	constructor( 
		private cd: ChangeDetectorRef, 
		private router: Router, 
		private httpService: HttpService,
		private publicService: PublicService,
		private dialogSerice: DialogService
	){

	}

	ngOnInit(){
		//菜单获取
		this.getMenu();
		//用户信息获取
		this.userInfo = this.publicService.userInfo;
		//用户初次进入页面时获取nav信息
		this.activeUrl = location.pathname;
		this.mainNav = this.activeUrl.split('/')[2];
		this.isInit = true;
		//监控路由导航
		this.obrouter = this.router.events.subscribe(event => {
			//生产环境路由出错时，刷新页面
			if (event instanceof NavigationError){
				if (environment.production){
					location.reload();
				}else{
					console.log('导航出错');
				}
			}
			//路由懒加载开始加载时，加载loading动画
			if (event instanceof RouteConfigLoadStart){
				this.publicService.loading(true);
			}
			//路由懒加载完成时，取消loading动画
			if (event instanceof RouteConfigLoadEnd){
				this.publicService.loading(false);
			}
			// 路由跳转时切换激活的菜单
			if (event instanceof ResolveEnd){
				this.activeUrl = event.urlAfterRedirects;
				this.mainNav = this.activeUrl.split('/')[2];
				const childNav = this.activeUrl.split('/')[3];

				if (childNav){
					this.openSubMenu(childNav);
				}
			}
		});
	}

	// 页面跳转时打开对应的subMenu
	openSubMenu(childNav){
		if ([
			'create-data', 
			'job-management'
		].indexOf(childNav) > -1){ 
			// 数据抽取
			this.activeSubMenu = 1;
		}else if ([
			'template-management', 
			'data-import'
		].indexOf(childNav) > -1){
			// 半结构化数据导入
			this.activeSubMenu = 2;
		}
	}

	getMenu(){
		this.navList = mockMenu;
		this.navList.unshift(this.indexList);
		setTimeout(() => {
			this.initLeftMenu();
		}, 300);
		/* this.httpService.getData('/menulist')
		.subscribe(res => {
			if (res && res.type == 'success'){
				this.navList = res.data;
				this.navList.unshift(this.indexList);

				if(this.isInit){
					this.initLeftMenu();
				}else{
					setTimeout(()=>{
						this.initLeftMenu();
					},300);
				}
			}
		}); */
	}
	initLeftMenu(){
		this.navList.forEach((item, i) => {
			if (item.path.indexOf(this.mainNav) > -1){
				this.activeTopIndex = i;
				this.leftmenuList = this.navList[this.activeTopIndex].children;
			}
		});
	}

	activeTopIndex: number | string = 0;
	indexList: any = {
		title: '首页',
		path: '/index',
		icon: 'home',
		children: [{
			title: '首页',
			path: '/index/root',
			icon: 'home'
		}]
	};
	topMenuClick(i): void {
		if (i == this.activeTopIndex) return;
		if (i >= 0){
			this.leftmenuList = this.navList[i].children;
		}
		this.activeTopIndex = i;
	}

	toggleNavStatus(): void {
		this.navStatus = this.navStatus ? false : true;
	}

	logOut(): void {
		sessionStorage.clear();
		this.router.navigateByUrl('/login');
		this.dialogSerice.showSuccess('您已退出系统');
	}

	cancel(){

	}
}
