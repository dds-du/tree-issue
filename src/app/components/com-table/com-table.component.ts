import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";
import { Data } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { NzTableQueryParams, NzTableSize } from 'ng-zorro-antd';

interface EmitData {
	type: string;
	data: any;
}
@Component({
	selector: 'com-table',
	templateUrl: './com-table.component.html',
	styleUrls: ['./com-table.component.less']
})

export class ComTableComponent implements OnInit {

	total: number = 1;
	pageIndex: number = 1;
	paramObj: Object = {};    //服务端请求参数
	isInit: boolean = false;  // 是否初始化完毕
	nzScroll: {x?: string, y?: string} = {};
	hasScroll: boolean = false;

	@Input() pageSize: number = 10;
	@Input() dataList: Data[] = [];     //表格数据
	@Input() loading: boolean = false;  //加载状态
	@Input() isChecked: boolean = false; //是否展示复选框
	@Input() isRadio: boolean = false;  //是否展示单选框
	@Input() headers: any[] = [];       //表格标题、字段信息
	@Input() getAll: boolean = false;   //是否提交所有选中信息，默认只提交选中项的keyField
	@Input() getOnServer: boolean = true; //是否从服务端获取数据
	@Input() getUrl: string;            //如果需要从接口请求表格数据，则传入url
	@Input() keyField: string = 'id';    //进行操作的字段，默认使用id
	@Input() actionRight: boolean = false; //操作列是否固定在右边
	@Input() tableSize: NzTableSize = 'small'; //default默认 middle中等 small小号
	//接口所带查询条件
	@Input() set getParams(params: Object){
		this.paramObj = params;
		if (!this.isInit) return;
		
		if (this.getUrl){
			this.getInitData();
		}
	}          

	@Output() valueChange: any = new EventEmitter();

	constructor( private httpService: HttpService ){}

	ngOnInit(){
		this.isInit = true;

		if (this.getOnServer){
			this.getInitData();
		}
		this.comScroll();
	}
	//清空选中项
	clearCheck(){
		this.checked = false;
		this.indeterminate = false;
		this.setOfCheckedId.clear();
		this.radioValue = '';
	}
	//计算滚动值
	comScroll(){
		const content: any = document.querySelector('.home-body-right');
		const cWidth = content.offsetWidth;
		let tbWidth: number = 0;
		for (const item of this.headers){
			tbWidth += item.width ? item.width : 100;
		}
		if (cWidth - tbWidth < 100){
			this.nzScroll = {
				x: tbWidth + 'px'
			};
			this.hasScroll = true;
		}
	}

	//初始化表格数据
	getInitData(){
		const params = Object.assign( {limit: this.pageSize, offset: 1}, this.paramObj );
		//this.loading = true;
		this.httpService.postData(this.getUrl, params)
		.subscribe(res => {
			//this.loading = false;
			if (res && res.type == 'success'){
				this.total = res.data.total; 
				this.dataList = res.data.data;
				this.clearCheck();
			}
		});
	}

	//外部查询条件改变，懒加载表格数据
	loadData(
		pageIndex: number,
		pageSize: number,
		sortBy: Object,
		filter: Array<{ key: string; value: string[] }>
	): void {
		//this.loading = true;
		const params: Object = {
			offset: pageIndex, limit: pageSize, sortBy, filter
		};
		this.httpService.postData( this.getUrl, Object.assign( params, this.paramObj) )
		.subscribe(res => {
			//this.loading = false;
			if (res && res.type == 'success'){
				this.total = res.data.total; 
				this.dataList = res.data.data;
				this.clearCheck();
			}
		});
	}

	//由于会自动触发一次此功能，因此判断是第一次触发时不执行此函数
	isFirstTrigger: boolean = true;
	//内部排序、过滤参数改变之后请求懒加载数据
	onQueryParamsChange( params: NzTableQueryParams ): void {
		if (this.isFirstTrigger) {
			this.isFirstTrigger = false;
			return;
		}
		if (!this.getUrl) return;
		console.log(params);
		const { pageSize, pageIndex, sort, filter } = params;
		const currentSort = sort.find(item => item.value !== null);
		// const sortField = (currentSort && currentSort.key) || null;
		// const sortOrder = (currentSort && currentSort.value) || null;
		
		this.setOfCheckedId.clear();
		//this.loadData(pageIndex, pageSize, sortField, sortOrder, filter);
		this.loadData(pageIndex, pageSize, (currentSort && sort) || null, filter);
	}

	checked = false;
	indeterminate = false;
	listOfCurrentPageData: Data[] = [];
	setOfCheckedId = new Set<number|string>();

	updateCheckedSet(id: number|string, checked: boolean): void {
		if (checked) {
			this.setOfCheckedId.add(id);
		} else {
			this.setOfCheckedId.delete(id);
		}

		if (this.getAll){
			this.valueChange.emit(this.listOfCurrentPageData.filter( data => this.setOfCheckedId.has(data[this.keyField]) ));
		}else{
			this.valueChange.emit([...this.setOfCheckedId]);
		}
	}

	onCurrentPageDataChange(listOfCurrentPageData: Data[]): void {
		if (!this.isInit) return;
		this.listOfCurrentPageData = listOfCurrentPageData;
		this.refreshCheckedStatus();
	}

	refreshCheckedStatus(): void {
		const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
		this.checked = listOfEnabledData.every((item) => this.setOfCheckedId.has(item[this.keyField]));
		this.indeterminate = listOfEnabledData.some((item) => this.setOfCheckedId.has(item[this.keyField])) && !this.checked;
	}

	onItemChecked(id: number|string, checked: boolean): void {
		this.updateCheckedSet(id, checked);
		this.refreshCheckedStatus();
	}

	onAllChecked(checked: boolean): void {
		this.listOfCurrentPageData.filter( ({ disabled }) => 
			!disabled).forEach((item) => this.updateCheckedSet(item[this.keyField], checked
		));
		this.refreshCheckedStatus();
	}

	radioValue: string|number; 
	onItemRadio(radioValue: number|string): void{
		if (this.getAll){
			this.valueChange.emit(this.listOfCurrentPageData.filter( data => data[this.keyField] == radioValue ));
		}else{
			this.valueChange.emit([radioValue]);
		}
	}

	@Output() trChange: EventEmitter<EmitData> = new EventEmitter<EmitData>();
	//操作按钮点击
	trAction(type, data){
		this.trChange.emit({
			type: type,
			data
		});
	}

	reset(value){
		value = '';
	}
}