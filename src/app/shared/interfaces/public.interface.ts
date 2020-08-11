import { NzTableFilterFn, NzTableFilterList, NzTableSortFn } from 'ng-zorro-antd';
//用户信息
export interface User {
	username: string;
	['propName']: string;
}
//响应式表单错误提示语
export interface ValidVerify {
	field: string;
	text: string;
}
//下拉option
export interface Option {
	label: string;
	value: string|number|null;
}
//表格表头
export interface TableHeader {
	label: string;    //表头显示字段
	field: string;    //表头存储字段
	type: string;     //表格类型：text展示文本 action操作栏(根据需要扩展)
	key?: boolean;    //表格是否是关健字段
	width?: number|string;   //表格宽度
	sortFn?: NzTableSortFn|boolean; //排序，true为服务端排序，Function为自定义排序函数
	sortOrder?: 'descend' | 'ascend' | null; //当前排序状态
	sortDirections?: Array<'ascend' | 'descend' | null>;   //自定义初始排序方向,ascend正序 descend倒序
	sortPriority?: number;   //多列排序优先级
	filterMultiple?: boolean;  //是否多选过滤
	//showFilter?: boolean;    //是否显示过滤器
	listOfFilter?: NzTableFilterList; //过滤器内容
	filterFn?: NzTableFilterFn|boolean; //过滤，true为服务端过滤，Function为自定义过滤函数
	filterChangeFn?: Function; //过滤数据回调
	customFilter?: boolean; //是否有自定义过滤器
	visible?: boolean;       //显示隐藏自定义过滤器
	searchValue?: string;    //查询字段
	action?: string[];        //工具栏按钮集合
} 
export const sexList: Option[] = [
	{ label: '男', value: 'male' },
	{ label: '女', value: 'female' }
];
//面包屑
export interface Bread {
	title: string;
	url: string;
	content?: string;
}