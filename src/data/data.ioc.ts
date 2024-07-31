import { HttpClient } from '@angular/common/http';
import { Provider } from "@angular/core";
import { IAuthInteractor } from './interactors/contracts/iauth.interactor';
import { AuthInteractor } from './interactors/implementations/auth/auth.interactor';
import { AuthRepository } from './datasources/remote/repo-implementations/auth/auth.repository';
import { AuthLoginUseCase } from '../domain/usecases/auth/auth-login.usecase';
import { AuthRegisterUseCase } from '../domain/usecases/auth/auth-register.usecase';


export const DATA_AUTH_IOC: Provider[] = [
    {
        provide: IAuthInteractor,
        useClass: AuthInteractor
    },
    {
        deps: [HttpClient],
        provide: AuthRepository,
        useFactory: (http: HttpClient) => new AuthRepository(http)
    },

    {
        deps: [AuthRepository],
        provide: AuthLoginUseCase,
        useFactory: (repository: AuthRepository) => new AuthLoginUseCase(repository),
    },

    {
        deps: [AuthRepository],
        provide: AuthRegisterUseCase,
        useFactory: (repository: AuthRepository) => new AuthRegisterUseCase(repository),
    },
];