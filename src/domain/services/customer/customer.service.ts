import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { CustomerRepository } from 'data/datasources/remote/repo-implementations/customer/customer.repostity';
import { ICustomer } from 'data/requests/customer/customer.request';
import { ListCustomerResponse } from 'data/responses/customer/customers.reponses';
import { DetailCustomerResponse } from 'data/responses/customer/detail.customer.reponses';
import { UpdateCustomerResponse } from 'data/responses/customer/update.customer.reponses';
import { Observable } from 'rxjs'; // Import of từ rxjs

@Injectable({
	providedIn: 'root',
})
export class CustomerService {
	constructor(private customerRepository: CustomerRepository) {}

	getCustomer(): Observable<ListCustomerResponse<ICustomer>> {
		return this.customerRepository.getCustomer();
	}

	getCustomer_pageparams(params: RequestParams): Observable<ListCustomerResponse<ICustomer>> {
		return this.customerRepository.getCustomer_pageparams(params);
	}
	detailCustomer(param: ParamsID): Observable<DetailCustomerResponse<ICustomer>> {
		return this.customerRepository.detailCustomer(param);
	}
	updateCustomer(param: ICustomer): Observable<UpdateCustomerResponse<ICustomer>> {
		return this.customerRepository.updateCustomer(param);
	}
}
