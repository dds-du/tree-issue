import { Component, OnInit, Input } from "@angular/core";
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidVerify, Option } from 'src/app/shared/interfaces/public.interface';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
	selector: 'com-input',
	templateUrl: './com-input.component.html',
	styleUrls: [ './com-input.component.less' ]
})

export class ComInputComponent implements OnInit {
	@Input() oneLine: boolean = false; //是否将label和input展示在一行
	@Input() type: string = 'text'; //输入框类型
	@Input() label: string = '';   //label标签
	@Input() labelWidth: string|number = null; //label宽度，如果不给则为默认宽度
	@Input() field: string = '';   //字段
	@Input() placeholder: string = '请输入';  //placeholder,默认为请输入
	@Input() forms: FormGroup;   //父级forms
	@Input() required: boolean = false; // 是否是必填项
	@Input() verifys: ValidVerify[] = []; //错误提示列表，{feild: 错误字段名, text: 错误提示语}
	@Input() errRight: boolean = false;  //错误提示是否显示在右边

	get self() { return this.forms.get( this.field ); }
	
	@Input() set disabled(disabled) { //设置禁用启用
		if (!this.forms)return;
		if (disabled){
			this.self.disable();
		}else{
			this.self.enable();
		}
	}
	@Input() readonly: boolean = false;

	constructor( private httpService: HttpService ){}
	
	ngOnInit(){}
}