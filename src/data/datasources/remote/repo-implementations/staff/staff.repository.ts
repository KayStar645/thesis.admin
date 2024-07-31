// staff.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IEmployee } from 'data/requests/staff/employees.request';
import { CreateEmployeeResponse } from 'data/responses/staff/create-employee.reponses';
import { DetailEmployeeResponse } from 'data/responses/staff/detail-employee.reponses';
import { ListEmployeeResponse } from 'data/responses/staff/employees.responses';
import { UpdateEmployeeResponse } from 'data/responses/staff/update-employee.reponses';
import { IEmployeeRepository } from 'domain/repositories/istaff.reposity';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EmployeeRepository extends IEmployeeRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}

	getEmployees(): Observable<ListEmployeeResponse<IEmployee>> {
		return this.http.get<ListEmployeeResponse<IEmployee>>(`${this.apiUrl}/smw-api/staff`);
	}

	getEmployees_allparams(params: RequestParams): Observable<ListEmployeeResponse<IEmployee>> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListEmployeeResponse<IEmployee>>(`${this.apiUrl}/smw-api/staff`, {
			params: httpParams,
		});
	}

	getEmployees_pageparams(params: RequestParams): Observable<ListEmployeeResponse<IEmployee>> {
		const httpParams = new HttpParams()
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListEmployeeResponse<IEmployee>>(`${this.apiUrl}/smw-api/staff`, {
			params: httpParams,
		});
	}

	addEmployee(staff: IEmployee): Observable<CreateEmployeeResponse<IEmployee>> {
		return this.http.post<CreateEmployeeResponse<IEmployee>>(`${this.apiUrl}/smw-api/staff`, staff);
	}

	override deleteEmployee(params: ParamsID): Observable<any> {
		const url = `${this.apiUrl}/smw-api/staff?Id=${params.Id}`;
		return this.http.delete<any>(url);
	}

	override updateEmployee(params: IEmployee): Observable<UpdateEmployeeResponse<IEmployee>> {
		return this.http.put<UpdateEmployeeResponse<IEmployee>>(`${this.apiUrl}/smw-api/staff`, params);
	}

	override detailEmployee(params: ParamsID): Observable<DetailEmployeeResponse<IEmployee>> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);

		return this.http.get<DetailEmployeeResponse<IEmployee>>(`${this.apiUrl}/smw-api/staff/detail`, {
			params: httpParams,
		});
	}
}
