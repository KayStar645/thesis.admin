import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { DEFAULT_REDIRECT } from 'config/menu';
import { IAuthInteractor } from 'data/interactors/contracts/iauth.interactor';
import { AuthLoginRequest } from 'data/requests/auth/auth-login.request';
import { AuthService } from 'domain/services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

@Component({
	selector: 'app-auth-login',
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
	username: string = '';
	password: string = '';
	showPassword: boolean = false;
	message!: string;

	loginMutate = injectMutation(() => ({
		mutationFn: (data: AuthLoginRequest) => {
			return lastValueFrom(this.iauthInteractor.login(data));
		},
		onSuccess: (result) => {
			if (result.data) {
				const tokenData: any = jwtDecode(result.data.token);

				if (tokenData.type === 'User') {
					this.toastr.error('Vai trò người dùng không hợp lệ');

					return;
				}

				this.authService.setToken(result.data.token);

				this.router.navigate([DEFAULT_REDIRECT]);
			}
		},
		onError: (err: any) => {
			this.toastr.error(err.error.messages[0] || err.message);
		},
	}));

	constructor(
		private iauthInteractor: IAuthInteractor,
		private router: Router,
		private authService: AuthService,
		private toastr: ToastrService,
	) {}

	ngOnInit() {}

	togglePasswordVisibility(): void {
		this.showPassword = !this.showPassword;
	}

	Login(): void {
		const loginRequest: AuthLoginRequest = this.createLoginRequest();

		this.loginMutate.mutate(loginRequest);
	}

	GoogleLogin(): void {
		console.log('a');
	}

	private createLoginRequest(): AuthLoginRequest {
		return {
			userName: this.username,
			password: this.password,
		};
	}
}
