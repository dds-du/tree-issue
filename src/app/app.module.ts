import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NZ_CONFIG, zh_CN, en_US, NZ_I18N } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import en from '@angular/common/locales/en';

let nzLang: any;
if (environment.lang == 'zh'){
	nzLang = zh_CN;
	registerLocaleData(zh);
}else{
	nzLang = en_US;
	registerLocaleData(en);
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		SharedModule,
		AppRoutingModule
	],
	providers: [ 
		{ provide: NZ_CONFIG, useValue: { message: { nzMaxStack: 5 } } },
		{ provide: NZ_I18N, useValue: nzLang }
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
