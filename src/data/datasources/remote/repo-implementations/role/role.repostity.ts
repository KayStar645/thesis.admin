// staff.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
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
import { IRoleRepository } from 'domain/repositories/role.reposity';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RoleRepository extends IRoleRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}

	override getRole(): Observable<ListRoleResponse<IRole>> {
		return this.http.get<ListRoleResponse<IRole>>(`${this.apiUrl}/smw-api/role`);
	}

	override getRole_allparams(params: RequestParams): Observable<ListRoleResponse<IRole>> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize);
		return this.http.get<ListRoleResponse<IRole>>(`${this.apiUrl}/smw-api/role`, {
			params: httpParams,
		});
	}

	override getRole_pageparams(params: RequestParams): Observable<ListRoleResponse<IRole>> {
		const httpParams = new HttpParams().set('Page', params.page).set('PageSize', params.pageSize);
		return this.http.get<ListRoleResponse<IRole>>(`${this.apiUrl}/smw-api/role`, {
			params: httpParams,
		});
	}

	override updateRole(params: IRole): Observable<UpdateRoleResponse<IRole>> {
		return this.http.put<UpdateRoleResponse<IRole>>(`${this.apiUrl}/smw-api/role`, params);
	}

	override detailRole(params: ParamsID): Observable<DetailRoleResponse<IRole>> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);
		return this.http.get<DetailRoleResponse<IRole>>(`${this.apiUrl}/smw-api/role/detail`, {
			params: httpParams,
		});
	}

	override roleWithController(): Observable<RoleWithControllerResponse<IRoleWithController[]>> {
		return this.http.get<RoleWithControllerResponse<IRoleWithController[]>>(
			`${this.apiUrl}/smw-api/role/list-with-controller`,
		);
	}

	override addRole(params: IRole): Observable<CreateRoleResponse<IRole>> {
		return this.http.post<CreateRoleResponse<IRole>>(`${this.apiUrl}/smw-api/role`, params);
	}
}
