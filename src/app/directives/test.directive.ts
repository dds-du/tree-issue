import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
	selector: '[testdic]'
})

export class TestDirective {
	constructor(private el: ElementRef, render: Renderer2){

	}
	@Input() testdic: string = '';
	ngAfterViewInit(){
		//this.el.nativeElement.style.background = 'red'
	}
}