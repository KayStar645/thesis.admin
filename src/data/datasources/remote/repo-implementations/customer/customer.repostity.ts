// staff.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { ICustomer } from 'data/requests/customer/customer.request';
import { ListCustomerResponse } from 'data/responses/customer/customers.reponses';
import { DetailCustomerResponse } from 'data/responses/customer/detail.customer.reponses';
import { UpdateCustomerResponse } from 'data/responses/customer/update.customer.reponses';
import { ICustomerRepository } from 'domain/repositories/icustomer.reposity';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CustomerRepository extends ICustomerRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}
	override getCustomer(): Observable<ListCustomerResponse<ICustomer>> {
		return this.http.get<ListCustomerResponse<ICustomer>>(`${this.apiUrl}/smw-api/customer`);
	}
	override getCustomer_allparams(params: RequestParams): Observable<ListCustomerResponse<ICustomer>> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize);
		return this.http.get<ListCustomerResponse<ICustomer>>(`${this.apiUrl}/smw-api/customer`, {
			params: httpParams,
		});
	}

	override getCustomer_pageparams(params: RequestParams): Observable<ListCustomerResponse<ICustomer>> {
		const httpParams = new HttpParams().set('Page', params.page).set('PageSize', params.pageSize);
		return this.http.get<ListCustomerResponse<ICustomer>>(`${this.apiUrl}/smw-api/customer`, {
			params: httpParams,
		});
	}
	override updateCustomer(params: ICustomer): Observable<UpdateCustomerResponse<ICustomer>> {
		return this.http.put<UpdateCustomerResponse<ICustomer>>(`${this.apiUrl}/smw-api/customer`, params);
	}
	override detailCustomer(params: ParamsID): Observable<DetailCustomerResponse<ICustomer>> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);
		return this.http.get<DetailCustomerResponse<ICustomer>>(`${this.apiUrl}/smw-api/customer/detal`, {
			params: httpParams,
		});
	}
}
