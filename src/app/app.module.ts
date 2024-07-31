import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import vi from '@angular/common/locales/vi';
import { importProvidersFrom, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { DATA_AUTH_IOC } from 'data/data.ioc';
import { AuthInterceptor } from 'domain/services/auth.interceptor';
import { AuthService } from 'domain/services/auth/auth.service';
import { NgProgressModule } from 'ngx-progressbar';
import { ToastrModule } from 'ngx-toastr';
import { RemoveCommaPipeModule } from 'remove-comma.pipe/remove-comma.pipe.module';
import { environment_firebase } from '../environments/environment.development';
import { ModalService } from './_components/modal/services/modal.service';
import { NotificationModalService } from './admin/_components/ui/notification/services/notification.modal.service';
import { BreadcrumbService } from './admin/_services/breadcrumbs/breadcrumbs.service';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgProgressRouterModule } from 'ngx-progressbar/router';

registerLocaleData(vi);

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		CommonModule,
		AngularFireModule.initializeApp(environment_firebase.firebase),
		AngularFireStorageModule,
		RemoveCommaPipeModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			timeOut: 2000,
			progressBar: true,
			progressAnimation: 'increasing',
			newestOnTop: true,
		}),
		AngularQueryDevtools,
		AppRoutingModule,
		NgProgressModule,
		NgProgressRouterModule,
	],
	providers: [
		DatePipe,
		provideAngularQuery(new QueryClient()),

		...DATA_AUTH_IOC,
		AuthService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		DatePipe,

		ModalService,
		NotificationModalService,
		BreadcrumbService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
