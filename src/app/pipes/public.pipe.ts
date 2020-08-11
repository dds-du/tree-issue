import { Pipe, PipeTransform } from "@angular/core";

//启用停用状态管道
@Pipe({
	name: 'status'
})

export class  StatusPipe implements PipeTransform{
	statusMap: Object = {
		Y: '启用',
		N: '禁用'
	};
	transform(status: string): string{
		return this.statusMap[status];
	}
}