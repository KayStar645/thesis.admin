import { Injectable } from '@angular/core';
import { Result } from 'core/types/types';
import { AuthLoginRequest } from 'data/requests/auth/auth-login.request';
import { AuthRegisterRequest } from 'data/requests/auth/auth-register.request';
import { AuthLoginResponses } from 'data/responses/auth/auth-login.responses';
import { AuthRegistarResponses } from 'data/responses/auth/auth-register.responses';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class IAuthInteractor {
	abstract login(params: AuthLoginRequest): Observable<Result<AuthLoginResponses>>;
	abstract register(params: AuthRegisterRequest): Observable<Result<AuthRegistarResponses>>;
}
