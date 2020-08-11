import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

const regList = [
	
];

export function MatchValidator(matchRegType: string): ValidatorFn {
	let _regRes: RegExp; //验证的正则表达式
	let errorText = '';   //错误提示语
	//验证规则
	switch ( matchRegType ) {
		//汉字+拼音+数字+下划线
		case 'valid1':
			_regRes = /^[A-Za-z0-9\u3091-\uffe5_\_\-]*$/;
			errorText = '请输入汉字+拼音+数字+下划线';
			break;

		//拼音+数字
		case 'valid2':
			_regRes = /^[A-Za-z0-9|\-]*$/;
			errorText = '请输入拼音+数字';
			break;
		
		//电话(只需要格式校验)
		case 'phone':
			_regRes = /^[0-9\_\-\s\+]*$/;
			errorText = '请输入电话号码';
			break;

		//邮箱
		case 'email':
			_regRes = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			errorText = '请输入正确的邮箱';
			break;

		//支持5位整数
		case 'num5':
			_regRes = /^([1-9]\d{0,4}|0)$/;
			errorText = '请输入支持5位以内整数';
			break;

		//支持整数
		case 'int':
			_regRes = /^[1-9]\d*$/;
			errorText = '请输入整数';
			break;

		//支持10位整数,可以两位小数点
		case 'floot8':
			_regRes = /^(^[1-9](\d{0,7})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)$/;
			errorText = '请输10位整数,可以两位小数点';
			break;

		//6-16位数字与字母组合，不能包含特殊字符
		case 'password1':
			_regRes = /^[a-zA-Z0-9]{6,16}$/;
			errorText = '请输入6-16位数字与字母组合';
			break;

		//1-8位正整数
		case 'int8':
			_regRes =  /^[1-9]\d{0,7}$/;
			errorText = '请输入1-8位正整数';
			break;

		//2位小数
		case 'float2':
			_regRes = /^-?([1-9](\d{0,4})?(\.\d{1,4})?$)|(^0$)|(^\d\.\d{1,4})$/;
			errorText = '请输入2位小数';
			break;

		case 'ip':
			_regRes = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
			errorText = '请输入ip地址';
			break;

		default:
			_regRes = /.*/;
	}

	//验证是否匹配，如果匹配，则验证成功返回null，如果不匹配，则返回错误文本
	return (control: AbstractControl): {[key: string]: any} | null => {
		const match = _regRes.test(control.value);
		return !match ? { "match": {value: control.value, text: errorText} } : null;
	};
}

/* 
一致性对比:
如果密码和确认密码不一致时返回错误
*/
export const inconsistentValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
	const firstValue = control.get('password').value;
	const secondValue = control.get('surepassword').value;
	return firstValue !== secondValue ? { 'inconsistent': true } : null;
};

/* 
空值查询:
如果所有值都为空 返回false
*/
export const allEmptyValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
	const controls = control.controls;
	let valid = false;
	for (const key in controls){
		if (controls[key].value){
			valid = true;
			break;
		}
	}
	return !valid ? { 'allEmpty': true } : null;
};