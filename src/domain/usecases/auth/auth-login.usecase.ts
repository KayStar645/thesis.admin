import { IAuthRepository } from '../../repositories/iauth.repository';
import { Observable } from 'rxjs';
import { AuthLoginRequest } from '../../../data/requests/auth/auth-login.request';
import { AuthLoginResponses } from '../../../data/responses/auth/auth-login.responses';
import { Injectable } from '@angular/core';
import { Usecase } from '../../../core/contracts/usecase.contract';
import { Param } from '../../../core/params/param.payload';
import { Result } from '../../../core/types/types';

@Injectable({ providedIn: 'root' })
export class AuthLoginUseCase implements Usecase<Param<AuthLoginRequest>, Observable<Result<AuthLoginResponses>>> {
	constructor(private iauthRepository: IAuthRepository) {}

	execute(params: Param<AuthLoginRequest>): Observable<Result<AuthLoginResponses>> {
		console.log('soso 3');
		return this.iauthRepository.login(params.payload);
	}
}
