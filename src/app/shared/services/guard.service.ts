import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad
}                           from '@angular/router';


import { HttpService } from './http.service';
import { Route } from '@angular/compiler/src/core';


@Injectable({
    providedIn: "root"
})

// 登录验证路由守卫
export class LoginAuthGuardService implements CanLoad {

    constructor(
        private router: Router
        ) {}


    canLoad(route: Route): boolean {
        //查看sessionStorage内是否有用户登录信息
        const _token = window.sessionStorage.getItem('userKey') || undefined;

        if (!_token || _token === ''){
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }

}

@Injectable({
    providedIn: "root"
})

// 模块方法路由守卫
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private httpService: HttpService
        ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        //查看sessionStorage内是否有用户登录信息
        const _token = window.sessionStorage.getItem('userKey') || undefined;
        
        if (!_token || _token === ''){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        return this.canActivate(route, state);
    }

}


