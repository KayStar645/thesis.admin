import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.development';
import { Result } from 'core/types/types';
import { AuthLoginRequest } from 'data/requests/auth/auth-login.request';
import { AuthRegisterRequest } from 'data/requests/auth/auth-register.request';
import { AuthLoginResponses } from 'data/responses/auth/auth-login.responses';
import { AuthRegistarResponses } from 'data/responses/auth/auth-register.responses';
import { IAuthRepository } from 'domain/repositories/iauth.repository';

@Injectable({ providedIn: 'root' })
export class AuthRepository extends IAuthRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}

	login(params: AuthLoginRequest): Observable<Result<AuthLoginResponses>> {
		console.log('soso 4');
		return this.http.post<Result<AuthLoginResponses>>(`${this.apiUrl}/smw-api/user/login`, params);
	}

	register(params: AuthRegisterRequest): Observable<Result<AuthRegistarResponses>> {
		return this.http.post<Result<AuthRegistarResponses>>(`${this.apiUrl}/smw-api/user/register`, params);
	}
}
