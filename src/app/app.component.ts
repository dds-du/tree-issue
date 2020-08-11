import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicService } from 'src/app/shared/services/public.service';
import { ISubscription } from 'rxjs/Subscription';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy{
	obLoad: ISubscription;
	isloading: boolean = false;
	constructor(private publicService: PublicService, private httpService: HttpService){

	}

	ngOnInit(){
		//订阅loading事件流,通过公共服务方法控制loading图的显示
		this.obLoad = this.publicService.load$.subscribe(load => {
			setTimeout(() => {
				this.isloading = load;
			});
		});
	}

	ngOnDestroy(){
		this.obLoad.unsubscribe();
	}
	
}
