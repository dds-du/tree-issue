import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { siderAnimate } from 'src/app/animations/main.animation';
import { Option, ValidVerify, TableHeader } from 'src/app/shared/interfaces/public.interface';
import { allEmptyValidator } from 'src/app/shared/validatorFun';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NzTreeNode, NzFormatEmitEvent, NzTreeNodeOptions, NzTreeComponent } from 'ng-zorro-antd';


@Component({
    templateUrl: './ata.component.html',
    animations: [ siderAnimate ]
})

export class AtaComponent implements OnInit {
    //顶部表单控件
    forms: FormGroup = this.fb.group({
        airType: [ null ],
        airClass: [ null ]
    }, {validators: allEmptyValidator});
    //组件的label宽度
    labelWidth: string = '80px';
    //下拉列表
    options: Option[] = [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
        { label: '选项3', value: 3 }
    ];
    //错误字段提示列表
    requiredVerify: ValidVerify[] = [
        { field: 'required', text: '该项必填!' }
    ];

    constructor(private fb: FormBuilder, private httpService: HttpService, private dialogService: DialogService ){

    }

    ngOnInit(){
        this.getSelectAta();
    }

    selectedKeys: Array<string|number> = [];

    getSelectAta(){
        setTimeout(() => {
            this.selectedKeys = [ '0-1-0-2' ];
            this.searParam = { ata: this.selectedKeys[0] };
        }, 0);
    }

    onTreeInit(e){

    }

    onTreeClick(e: NzFormatEmitEvent){
        this.searParam = { ata: e.keys[0] };
    }

    searParam: Object = {};

    onSearch(){
        if (!this.forms.valid){
            this.dialogService.showInfo('请输入内容后再查询');
            return;
        }
        
        console.log(this.forms.value);
        this.searParam = this.forms.value;
    }

    onReset(){
        console.log(this.forms.value);
        this.forms.reset();
        this.searParam = {};
    }

    loading: boolean = false;
    dataList: Data[] = [];
    dataChecked: any[] = [];
    tableHeader: TableHeader[] = [
        { label: '铁路型号', field: 'airType', type: 'text',
            sortFn: true,
            sortDirections: ['descend', null] 
        },
        { label: '铁路选型', field: 'airClass', type: 'text' },
        { label: '制造商', field: 'product', type: 'text' },
        { label: '座位数', field: 'sets', type: 'text',
            filterFn: true,
            listOfFilter: [
                { text: 'sets has 1', value: 1 }
            ],
        },
        { label: '操作', field: 'action', type: 'action', action: [ 'edit', 'delete' ] }
    ];

    tableValue: Array<number|string> = [];
    //表格值改变
    tableChange(e){
        console.log(e);
        this.tableValue = [...e];
    }

    siderForms: FormGroup = this.fb.group({
        id: [ '' ],
        airType: [ null, [Validators.required] ],
        airClass: [ null, [Validators.required] ],
        product: [ null, [Validators.required] ],
        sets: [ 0, [Validators.required] ]
    });

    siderStatus: boolean = false;
    siderTitle: string = '';
    newAirType(){
        this.siderTitle = '新建机型';
        this.siderForms.reset();
        this.siderStatus = true;
    }

    deleteTypes(){
        if (!this.tableValue.length){
            this.dialogService.showInfo('请选择机型！');
            return;
        }

        console.log('删除', this.tableValue);
        //删除数据
        /* this.httpService.postData('/delete/airtype',{ ids: this.tableValue })
        .subscribe(res=>{

        }) */
    }

    editAirType(data){
        this.siderTitle = '修改机型';
        this.siderForms.setValue(data);
        this.siderStatus = true;
    }

    siderOk(){
        //验证失败
        if (!this.siderForms.valid){
            this.siderForms.markAllAsTouched();
            return;
        }
        console.log(this.siderForms.value);
        //验证成功，添加铁路
        //this.httpService.postData('/addAirType',this.siderForms.value);
    }

    onTrChange(changeRef: any){
        console.log(changeRef);
        switch (changeRef.type) {
            case 'edit':
                this.editAirType(changeRef.data);
                break;
            case 'delete':
                console.log('删除', changeRef.data.id);
                //删除数据
                /* this.httpService.postData('/delete/airtype',{ id: changeRef.data.id })
                .subscribe(res=>{

                }) */
        }
    }
}