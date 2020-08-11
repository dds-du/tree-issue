import { Component, Input, Output, EventEmitter } from "@angular/core";
import { siderAnimate } from 'src/app/animations/main.animation';

@Component({
    selector: 'com-sider',
    templateUrl: './com-sider.component.html',
    animations: [ siderAnimate ]
})

export class ComSiderComponent {

    @Input() visible: boolean = false;
    @Input() Title: string = '';

    @Output() siderOk: EventEmitter<void> = new EventEmitter<void>();
    @Output() siderCancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(){

    }

    cancel(){
        this.siderCancel.emit();
        this.visible = false;
        this.visibleChange.emit(false);
    }

    submit(){
        this.siderOk.emit();
    }
}