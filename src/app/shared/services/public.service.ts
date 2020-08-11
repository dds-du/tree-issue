import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

interface User {
    username: string;
    ['propName']: any;
}

@Injectable({
    providedIn: "root"
})

export class PublicService {
    userInfo: User;
    load$: Subject<boolean> = new Subject<boolean>();
    
    constructor(){
        this.userInfo = JSON.parse(sessionStorage.getItem('userKey'));
    }

    //loading图案方法，true为显示，false为隐藏
    loading(isShow: boolean){
        this.load$.next(isShow);
    }
}