import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap';
import { DialogService } from './dialog.service';
import { PublicService } from './public.service';
import { Router } from '@angular/router';
import { CONFIG } from '../config';

interface HeaderOption {
	headers?: HttpHeaders;
}

interface Responce {
	content: string;
	type: string;
	data: any;
}

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	//设置请求头
	private _httpOptions: HeaderOption = {};
	private upOptions: HeaderOption = {};
	//加载层状态查看
	private _loadStatus: number = 0;
	//定义哪些错误要退出系统
	private _errorCode: number[] = []; //


	constructor(
		private _http: HttpClient,
		private dialogSerive: DialogService,
		private publicService: PublicService,
		private router: Router
	) {
		const _header: any = {
			"Content-Type": "application/x-www-form-urlencoded",
			// "Content-Type": "application/json",   //发送json
			//'accessToken': _token
		};

		const _upheader: any = {
			//"Content-Type": "multipart/form-data", //发送文件,如果需要上传文件，则需要将参数转化为FormData形式
		};

		this._httpOptions = {
			headers: new HttpHeaders(_header)
		};

		this.upOptions = {
			headers: new HttpHeaders(_upheader)
		};
	}


	/**
	 * 发送get请求
	 * @param url 传输数据访问接口链接
	 * @param param 查询参数 键值对一维对象
	 */
	getData(url: string, param: any= {}): Observable<Responce>{
		url = this.baseUrl(url);
		param = this.parseParam(param);
		param.timeUniqe = Date.now();

		//加载层
		if (this._loadStatus === 0) this.publicService.loading(true);
		this._loadStatus ++;

		const options: HeaderOption = this.setOptions('get', param);
		//请求服务器
		return this._http.get(url, options)
		.pipe(
			tap((res: any) => {
				// 监听请求，计算请求次数，处理错误
				this._loadStatus --;
				if (this._loadStatus === 0 ) this.publicService.loading(false);

				if (res.type != 'success'){
					this.dialogSerive.showError(res.data || '网络请求错误');
				}
			}),
			catchError(this.handleError())
		) as Observable<Responce>;
	}
	/**
	 * 发送post请求
	 * @param url 传输数据访问接口链接
	 * @param body 表单参数 键值对一维对象
	 * @param param 查询参数 键值对一维对象
	 */
	postData(url: string, body: any= {}, params: any= {}): Observable<Responce>{
		url = this.baseUrl(url);
		body = this.parseParam(body);
		body = this.jsonToParams(body);
		//加载层
		if (this._loadStatus === 0) this.publicService.loading(true);
		this._loadStatus ++;

		const options: HeaderOption = this.setOptions('post', params);
		//请求服务器
		return this._http.post(url, body, options)
		.pipe(
			tap((res: any) => {
				//监听请求，计算请求次数，处理错误
				this._loadStatus --;
				if (this._loadStatus === 0 ) this.publicService.loading(false);

				if (res.type != 'success'){
					this.dialogSerive.showError(res.data || '网络请求错误');
				}
				return res;
			}),
			catchError(this.handleError())
		) as Observable<Responce>;
	}
	/**
	 * 发送post请求,body为FormData文件对象
	 * @param url 传输数据访问接口链接
	 * @param body 表单参数
	 * @param param 查询参数
	 */
	upload(url: string, body: any= {}, params: any= {}): Observable<Responce>{
		url = this.baseUrl(url);
		//加载层
		if (this._loadStatus === 0) this.publicService.loading(true);
		this._loadStatus ++;

		const options: HeaderOption = this.setOptions('upload', params);
		//请求服务器
		return this._http.post(url, body, options)
		.pipe(
			tap((res: any) => {
				//监听请求，计算请求次数，处理错误
				this._loadStatus --;
				if (this._loadStatus === 0 ) this.publicService.loading(false);

				if (res.type != 'success'){
					this.dialogSerive.showError(res.data || '网络请求错误');
				}
				return res;
			}),
			catchError(this.handleError())
		) as Observable<Responce>;
	}
	/**
	 * 发送delete请求
	 * @param url 传输数据访问接口链接
	 * @param param 查询参数 键值对一维对象
	 */
	delete(url: string, param: any= {}): Observable<Responce>{
		url = this.baseUrl(url);
		param = this.parseParam(param);

		//加载层
		if (this._loadStatus === 0) this.publicService.loading(true);
		this._loadStatus ++;

		const options: HeaderOption = this.setOptions('get', param);
		//请求服务器
		return this._http.delete(url, options)
		.pipe(
			tap((res: any) => {
				//监听请求，计算请求次数，处理错误
				this._loadStatus --;
				if (this._loadStatus === 0 ) this.publicService.loading(false);

				if (res.type != 'success'){
					this.dialogSerive.showError(res.data || '网络请求错误');
				}
			}),
			catchError(this.handleError())
		) as Observable<Responce>;
	}

	private jsonToParams(arg: Object): string {
        if (JSON.stringify(arg) == "{}") return '';

        const params = Object.keys(arg).map((key) => {
            return encodeURIComponent(key) + "=" + encodeURIComponent(arg[key]);
        }).join("&");

        return params;
    }

	handleError<T> ( result?: T) {
		return (response: HttpErrorResponse): Observable<T> => {
			this._loadStatus --;
			if (this._loadStatus === 0 ) this.publicService.loading(false);

			let message: string;
			switch (response.status) {
				case 401:
				message = '401';
				break;
				case 403:
				if (response.url.endsWith('/auth/token')) {
					message = '无效用户';
				} else {
					message = '拒绝访问';
					this.router.navigateByUrl('/login');
				}
				break;
				case 404:
				message = '地址错误';
				break;
				case 400:
				message = '请求失败';
				break;
				case 504:
				message = '请求超时，请稍后重试';
				break;
				default:
				message = response.error.message;
			}
			this.dialogSerive.showError(message || '请求错误，请重试');

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	//设置请求头，在每次请求带上需要的头部信息(例如token)
	private setOptions(type: string, params: Object = {}): any{
		//this.setHttpHeaderFunction(header);
		//this._httpOptions.headers.set("accessToken","")
		const _option: any = Object.assign(
			{},
			type == 'upload' ? this.upOptions : this._httpOptions,
			{ responseType: 'json', params: params }
		);

		return _option;
	}

	//url地址整理
	private baseUrl(url: string): string{

		if (url.charAt(0) !== '/') url = '/' + url;

		return CONFIG.local + url;
	}
	//参数解析,去掉无效值
	private parseParam(param: Object): Object{
		for (const key in param){
			if (param.hasOwnProperty(key)){
				if (param[key] === null || typeof param[key] === 'undefined'){
					param[key] = '';
				}
			}
		}
		return param;
	}
}
