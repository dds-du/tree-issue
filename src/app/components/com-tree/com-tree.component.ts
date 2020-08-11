import { Component, ViewChild, EventEmitter, Output, Input, OnInit, OnDestroy, OnChanges, SimpleChange, SimpleChanges } from "@angular/core";
import { NzTreeNodeOptions, NzFormatEmitEvent, NzTreeComponent } from 'ng-zorro-antd';
import { HttpService } from 'src/app/shared/services/http.service';
import { Subject } from 'rxjs/Subject';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/combineLatest';
import { ReplaySubject, Observable } from 'rxjs';

const mockTree = [
	{
		title: '0-0',
		key: '0-0',
		icon: 'file',
		child: [
		{
			title: '0-0-0',
			key: '0-0-0',
			icon: 'file',
			child: [
			{ icon: 'file', title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
			{ icon: 'file', title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
			{ icon: 'file', title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
			]
		},
		{
			title: '0-0-1',
			key: '0-0-1',
			icon: 'file',
			child: [
			{ icon: 'file', title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
			{ icon: 'file', title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
			{ icon: 'file', title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
			]
		},
		{
			icon: 'file', 
			title: '0-0-2',
			key: '0-0-2',
			isLeaf: true
		}
		]
	},
	{
		title: '0-1',
		key: '0-1',
		icon: 'file',
		child: [
		{ icon: 'file', title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
		{ icon: 'file', title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
		{ icon: 'file', title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
		]
	},
	{
		icon: 'file', 
		title: '0-2',
		key: '0-2',
		isLeaf: true
	}
];
interface InputKey {
	type: string;
	value: Array<string|number> | boolean;
}

@Component({
	selector: 'com-tree',
	templateUrl: 'com-tree.component.html'
})

export class ComTreeComponent implements OnInit, OnDestroy {
	@ViewChild('treeComponent', {static: false}) nzTree: NzTreeComponent;
	
	treeData: NzTreeNodeOptions[] = [];  //树数据
	paramObj: Object = {};  //请求所带参数
	@Input() maxHeight: number = 400;   
	@Input() set data(data: NzTreeNodeOptions[]){//传入数据
		this.treeData = data;
	} 

	constructor(private httpService: HttpService) { }

	isInit: boolean = false;
	ngOnInit(){
		this.isInit = true;
		this.getTree(true);
	}

	@Output() treeInit: EventEmitter<void> = new EventEmitter<void>();
	getTree(isInit: boolean = false){
		//添加定时器就卡死，不添加就不报错
		setTimeout(() => {
			this.treeData = this.parseTreeData(mockTree);
		});

		// this.treeData = this.parseTreeData(mockTree);
	}

	parseTreeData(data: any): Array<NzTreeNodeOptions> {
		const node: any[] = [];
		for (const element of data){
			node.push({
				title: element.title,
				key: element.key,
				icon: element.icon || 'menu',
				isLeaf: element.child ? false : true,
				operateList: element.operateList,
				children: element.child ? this.parseTreeData(element.child) : element.child,
			});
		}
		return node;
	}

	ngOnDestroy(){
	}
}