import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RequestParams } from '../../core/params/requestParams';
import { ParamsID } from '../../core/params/paramID';
import { ICustomer } from 'data/requests/customer/customer.request';
import { ListCustomerResponse } from 'data/responses/customer/customers.reponses';
import { DetailCustomerResponse } from 'data/responses/customer/detail.customer.reponses';
import { UpdateCustomerResponse } from 'data/responses/customer/update.customer.reponses';

@Injectable({ providedIn: 'root' })
export abstract class ICustomerRepository {
	abstract getCustomer(): Observable<ListCustomerResponse<ICustomer>>;

	abstract getCustomer_pageparams(params: RequestParams): Observable<ListCustomerResponse<ICustomer>>;

	abstract getCustomer_allparams(params: RequestParams): Observable<ListCustomerResponse<ICustomer>>;

	abstract detailCustomer(params: ParamsID): Observable<DetailCustomerResponse<ICustomer>>;

	abstract updateCustomer(params: ICustomer): Observable<UpdateCustomerResponse<ICustomer>>;
}
