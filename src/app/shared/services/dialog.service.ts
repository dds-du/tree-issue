import { Injectable } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Injectable({
	providedIn: "root"
})

export class DialogService {
	private nzModale: any;
	private modules: any[] = [];
	private modaleStatus: boolean = false;  //是否已经打开

	private options: any = {
		nzVisible: true,
		nzCancelText: null,
		nzWrapClassName: "sf-dialogModal",
		nzMaskClosable: false,
		nzTitle: "提示",
		nzWidth: 540,
		nzMaskStyle: {
			'background-color': 'rgba(0, 0, 0, 0.4)'
		},
		nzOnOk: () => {},
	};

	constructor(
		private nzService: NzModalService,
		private message: NzMessageService
	) {}


	/**
	 * 显示加载层方法
	 * @param arg 参数
	 * @param status 参数<boolean> 是否只弹窗一次；
	 * @returns void
	 */
	public dialog(arg?: any, status: boolean = false): any{
		if (status && this.modaleStatus) return false;

		//类名
		if (arg && arg.nzWrapClassName) arg.nzWrapClassName = this.options.nzWrapClassName + ' ' + arg.nzWrapClassName;

		const _options = Object.assign({}, this.options, arg);

		this.nzModale = this.nzService.create(_options);

		if (status) this.modaleStatus = true;
		

		this.modules.push(this.nzModale);

		//关闭以后
		this.nzModale.afterClose
			.subscribe(reps => {
				if (status) this.modaleStatus = false;

				const index = this.modules.indexOf(this.nzModale);
				if (index > -1){
					this.modules.splice(index, 1);
				}
			});

		return this.nzModale;
	}

	/**
	 * 关闭所有弹窗
	 * @returns void
	 */
	closeAll(): void{
		this.nzService.closeAll();
		if (this.modules.length > 0){
			this.modules.forEach(elemt => {
				elemt.close();
			});

			this.modules = [];
		}
	}

	/*
	*message提示
	*参数1：string=>弹框信息
	*参数2：number=>弹框时间，默认5s
	*/
	toastTime: number = 5000;
	showInfo(message: string, time: number = this.toastTime){
		this.message.info(message, { nzDuration: time });
	}
	showSuccess(message: string, time: number = this.toastTime){
		this.message.success(message, { nzDuration: time });
	}
	showError(message: string, time: number = this.toastTime){
		this.message.error(message, { nzDuration: time });
	}
}