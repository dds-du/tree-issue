import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
	selector: 'com-time',
	templateUrl: './com-time.component.html',
	styleUrls: [ './com-time.component.less' ]
})

export class ComTimeComponent implements OnInit {

	@Input() type: string = 'date';  //组件类型，date日期选择 time时间选择 range开始结束日期选择
	@Input() showTime: boolean = false; //是否在日期选择器上展示时间选择
	@Input() oneLine: boolean = false; //是否将label和input展示在一行
	@Input() label: string = '';   //label标签
	@Input() labelWidth: string|number = null; //label宽度，如果不给则为默认宽度
	@Input() field: string = '';   //字段
	@Input() placeholder: string = '请选择';  //placeholder,默认为请选择
	@Input() forms: FormGroup;   //父级forms
	@Input() required: boolean = false;  //是否是必填项
	@Input() requiredText: string = '该项必填'; //必填错误提示语，默认为该项必填
	@Input() errRight: boolean = false;  //错误提示是否显示在右边
	@Input() readonly: boolean = false;  //是否只读
	@Input() showDot: boolean = true;    //是否显示label的:
	@Input() disabledDate: Function;
	paramObj: Object = {};
	tagData: any = [];
	timeValue: Date | null = null;

	get self() { return this.forms.get( this.field ); }

	constructor( private httpService: HttpService ){}

	isInit: boolean = false;
	ngOnInit(){
		this.isInit = true;
	}

	getOptions(){}

	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	onChange(value: string): void {
		this.valueChange.emit(value);
	}
}