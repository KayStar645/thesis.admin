import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { RoleRepository } from 'data/datasources/remote/repo-implementations/role/role.repostity';
import { IRoleWithController } from 'data/requests/role/role-with-controller.request';
import { IRole } from 'data/requests/role/role.request';
import { ListCustomerResponse } from 'data/responses/customer/customers.reponses';
import { DetailCustomerResponse } from 'data/responses/customer/detail.customer.reponses';
import { UpdateCustomerResponse } from 'data/responses/customer/update.customer.reponses';
import { CreateRoleResponse } from 'data/responses/role/create.role.reponses';
import { RoleWithControllerResponse } from 'data/responses/role/role-with-controller.role.reponses';
import { Observable } from 'rxjs'; // Import of từ rxjs

@Injectable({
	providedIn: 'root',
})
export class RoleService {
	constructor(private roleRepository: RoleRepository) {}

	getRole(): Observable<ListCustomerResponse<IRole>> {
		return this.roleRepository.getRole();
	}

	getRole_pageparams(params: RequestParams): Observable<ListCustomerResponse<IRole>> {
		return this.roleRepository.getRole_allparams(params);
	}

	detailRole(param: ParamsID): Observable<DetailCustomerResponse<IRole>> {
		return this.roleRepository.detailRole(param);
	}

	updateRole(param: IRole): Observable<UpdateCustomerResponse<IRole>> {
		return this.roleRepository.updateRole(param);
	}

	roleWithController(): Observable<RoleWithControllerResponse<IRoleWithController[]>> {
		return this.roleRepository.roleWithController();
	}

	addRole(data: IRole): Observable<CreateRoleResponse<IRole>> {
		return this.roleRepository.addRole(data);
	}
}
