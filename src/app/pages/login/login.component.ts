import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchValidator } from 'src/app/shared/validatorFun';
import { PublicService } from 'src/app/shared/services/public.service';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less']
})

export class LoginComponent {

	user = '公路客户化管理系统';
	userForm: FormGroup = this.fb.group({
		username: [ 'admin', [ Validators.required, Validators.minLength(3), Validators.maxLength(12), MatchValidator('valid1') ] ],
		password: [ '111111', [ Validators.required, Validators.minLength(6), Validators.maxLength(20), MatchValidator('valid2') ] ]
	});
	
	get username () { return this.userForm.get('username'); }
	get password () { return this.userForm.get('password'); }

	constructor(
		private router: Router,
		private httpService: HttpService, 
		private fb: FormBuilder,
		private publicService: PublicService
	){ }

	userLogin(){
		if (!this.userForm.valid){
			this.userForm.markAllAsTouched();
			return;
		}
		/* this.httpService.postData('/login', this.userForm.value)
		.subscribe(res => {
			if (res && res.type == 'success'){
				this.login(res.data);
			}
		}); */
		this.login({
			username: 'admin'
		});
	}

	login(data: any): void{
		sessionStorage.setItem('userKey', JSON.stringify(data));
		this.publicService.userInfo = data;
		this.router.navigateByUrl('/home');
	}

	userRegister(){

	}

}