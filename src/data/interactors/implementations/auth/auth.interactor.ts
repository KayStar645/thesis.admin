import { Injectable } from '@angular/core';
import { Param } from 'core/params/param.payload';
import { Result } from 'core/types/types';
import { IAuthInteractor } from 'data/interactors/contracts/iauth.interactor';
import { AuthLoginRequest } from 'data/requests/auth/auth-login.request';
import { AuthRegisterRequest } from 'data/requests/auth/auth-register.request';
import { AuthLoginResponses } from 'data/responses/auth/auth-login.responses';
import { AuthRegistarResponses } from 'data/responses/auth/auth-register.responses';
import { AuthLoginUseCase } from 'domain/usecases/auth/auth-login.usecase';
import { AuthRegisterUseCase } from 'domain/usecases/auth/auth-register.usecase';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthInteractor extends IAuthInteractor {
	constructor(private authLoginUseCase: AuthLoginUseCase, private authRegisterUseCase: AuthRegisterUseCase) {
		super();
	}

	public login(params: AuthLoginRequest): Observable<Result<AuthLoginResponses>> {
		console.log('soso 2');
		return this.authLoginUseCase.execute(new Param(params));
	}

	public register(params: AuthRegisterRequest): Observable<Result<AuthRegistarResponses>> {
		return this.authRegisterUseCase.execute(new Param(params));
	}
}
