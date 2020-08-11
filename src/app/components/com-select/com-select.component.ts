import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidVerify, Option } from 'src/app/shared/interfaces/public.interface';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
	selector: 'com-select',
	templateUrl: './com-select.component.html',
	styleUrls: [ './com-select.component.less' ]
})

export class ComSelectComponent implements OnInit {

	@Input() oneLine: boolean = false; //是否将label和input展示在一行
	@Input() mode: string = 'default'; //下拉模式，default tags multiple
	@Input() label: string = '';   //label标签
	@Input() labelWidth: string|number = null; //label宽度，如果不给则为默认宽度
	@Input() options: Option[] = []; //下拉选项列表
	@Input() field: string = '';   //字段
	@Input() placeholder: string = '请选择';  //placeholder,默认为请选择
	@Input() forms: FormGroup;   //父级forms
	//@Input() verifys: ValidVerify[] = []; //验证规则列表
	@Input() required: boolean = false;  //是否是必填项
	@Input() requiredText: string = '该项必填'; //必填错误提示语，默认为该项必填
	@Input() errRight: boolean = false;  //错误提示是否显示在右边
	@Input() getUrl: string;        //如果下拉列表需要发送请求获取，则传入请求的url
	@Input() set getParams(params){//请求携带的参数
		this.paramObj = params;
		if (this.isInit){
			this.getOptions();
		}
	} 
	@Input() valueField: string = 'id';
	@Input() labelField: string = 'text';
	paramObj: Object = {};
	tagData: any = [];

	get self() { return this.forms.get( this.field ); }

	constructor( private httpService: HttpService ){}

	isInit: boolean = false;
	ngOnInit(){
		if (this.getUrl){
			this.getOptions();
		}
		this.isInit = true;
	}

	getOptions(){
		this.httpService.postData(this.getUrl, this.paramObj)
		.subscribe(res => {
			if (res && res.type == 'success'){
				const temp = [];
				for (const item of res.data){
					temp.push({
						label: item[this.labelField],
						value: item[this.valueField]
					});
				}
				this.options = temp;
			}
		});
	}

	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	onChange(value: string): void {
		this.valueChange.emit(value);
	}
}