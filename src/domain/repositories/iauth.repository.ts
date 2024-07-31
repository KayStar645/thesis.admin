import { Observable } from 'rxjs';
import { AuthLoginResponses } from '../../data/responses/auth/auth-login.responses';
import { AuthLoginRequest } from '../../data/requests/auth/auth-login.request';
import { AuthRegisterRequest } from '../../data/requests/auth/auth-register.request';
import { AuthRegistarResponses } from '../../data/responses/auth/auth-register.responses';
import { Injectable } from '@angular/core';
import { Result } from '../../core/types/types';

@Injectable({ providedIn: 'root' })
export abstract class IAuthRepository {
	abstract login(params: AuthLoginRequest): Observable<Result<AuthLoginResponses>>;
	abstract register(params: AuthRegisterRequest): Observable<Result<AuthRegistarResponses>>;
}
