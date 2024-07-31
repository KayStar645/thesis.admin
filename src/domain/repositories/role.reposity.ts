import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IRoleWithController } from 'data/requests/role/role-with-controller.request';
import { IRole } from 'data/requests/role/role.request';
import { CreateRoleResponse } from 'data/responses/role/create.role.reponses';
import { DetailRoleResponse } from 'data/responses/role/detail.role.reponses';
import { RoleWithControllerResponse } from 'data/responses/role/role-with-controller.role.reponses';
import { ListRoleResponse } from 'data/responses/role/role.reponses';
import { UpdateRoleResponse } from 'data/responses/role/update.role.reponses';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class IRoleRepository {
	abstract getRole(): Observable<ListRoleResponse<IRole>>;

	abstract getRole_pageparams(params: RequestParams): Observable<ListRoleResponse<IRole>>;

	abstract getRole_allparams(params: RequestParams): Observable<ListRoleResponse<IRole>>;

	abstract detailRole(params: ParamsID): Observable<DetailRoleResponse<IRole>>;

	abstract updateRole(params: IRole): Observable<UpdateRoleResponse<IRole>>;

	abstract roleWithController(): Observable<RoleWithControllerResponse<IRoleWithController[]>>;

	abstract addRole(data: IRole): Observable<CreateRoleResponse<IRole>>;
}
