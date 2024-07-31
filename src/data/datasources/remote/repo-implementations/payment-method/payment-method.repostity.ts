// staff.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IPaymentMethod } from 'data/requests/payment-method/payment-method.request';
import { CreatePaymentMethodResponse } from 'data/responses/payment-method/create.payment-method.reponses';
import { DetailPaymentMethodResponse } from 'data/responses/payment-method/detail.payment-method.reponses';
import { ListPaymentMethodResponse } from 'data/responses/payment-method/payment-method.reponses';
import { UpdatePaymentMethodResponse } from 'data/responses/payment-method/update.payment-method.reponses';
import { IPaymentMethodRepository } from 'domain/repositories/payment-method.repository';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PaymentMethodRepository extends IPaymentMethodRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}

	override getPaymentMethod(): Observable<ListPaymentMethodResponse<IPaymentMethod>> {
		return this.http.get<ListPaymentMethodResponse<IPaymentMethod>>(`${this.apiUrl}/smw-api/payment`);
	}

	override getPaymentMethod_allparams(params: RequestParams): Observable<ListPaymentMethodResponse<IPaymentMethod>> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize);
		return this.http.get<ListPaymentMethodResponse<IPaymentMethod>>(`${this.apiUrl}/smw-api/payment`, {
			params: httpParams,
		});
	}

	override getPaymentMethod_pageparams(params: RequestParams): Observable<ListPaymentMethodResponse<IPaymentMethod>> {
		const httpParams = new HttpParams().set('Page', params.page).set('PageSize', params.pageSize);
		return this.http.get<ListPaymentMethodResponse<IPaymentMethod>>(`${this.apiUrl}/smw-api/payment`, {
			params: httpParams,
		});
	}

	override updatePaymentMethod(params: IPaymentMethod): Observable<UpdatePaymentMethodResponse<IPaymentMethod>> {
		return this.http.put<UpdatePaymentMethodResponse<IPaymentMethod>>(`${this.apiUrl}/smw-api/payment`, params);
	}

	override detailPaymentMethod(params: ParamsID): Observable<DetailPaymentMethodResponse<IPaymentMethod>> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);
		return this.http.get<DetailPaymentMethodResponse<IPaymentMethod>>(`${this.apiUrl}/smw-api/payment/detail`, {
			params: httpParams,
		});
	}

	override addPaymentMethod(params: IPaymentMethod): Observable<CreatePaymentMethodResponse<IPaymentMethod>> {
		return this.http.post<CreatePaymentMethodResponse<IPaymentMethod>>(`${this.apiUrl}/smw-api/payment`, params);
	}

	override deletePaymentMethod(params: ParamsID): Observable<any> {
		const url = `${this.apiUrl}/smw-api/payment?Id=${params.Id}`;

		return this.http.delete<any>(url);
	}
}
