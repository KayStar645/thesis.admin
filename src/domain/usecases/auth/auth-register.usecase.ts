import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthRegisterRequest } from '../../../data/requests/auth/auth-register.request';
import { Param } from '../../../core/params/param.payload';
import { Usecase } from '../../../core/contracts/usecase.contract';
import { IAuthRepository } from '../../repositories/iauth.repository';
import { AuthRegistarResponses } from '../../../data/responses/auth/auth-register.responses';
import { Result } from '../../../core/types/types';

@Injectable({
  providedIn: 'root',
})
export class AuthRegisterUseCase
  implements
    Usecase<
      Param<AuthRegisterRequest>,
      Observable<Result<AuthRegistarResponses>>
    >
{
  constructor(private iauthRepository: IAuthRepository) {}

  execute(
    params: Param<AuthRegisterRequest>
  ): Observable<Result<AuthRegistarResponses>> {
    return this.iauthRepository.register(params.payload);
  }
}
