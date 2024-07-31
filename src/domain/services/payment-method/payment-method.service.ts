import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { PaymentMethodRepository } from 'data/datasources/remote/repo-implementations/payment-method/payment-method.repostity';
import { IPaymentMethod } from 'data/requests/payment-method/payment-method.request';
import { ListCustomerResponse } from 'data/responses/customer/customers.reponses';
import { DetailCustomerResponse } from 'data/responses/customer/detail.customer.reponses';
import { UpdateCustomerResponse } from 'data/responses/customer/update.customer.reponses';
import { CreatePaymentMethodResponse } from 'data/responses/payment-method/create.payment-method.reponses';
import { Observable } from 'rxjs'; // Import of từ rxjs

@Injectable({
	providedIn: 'root',
})
export class PaymentMethodService {
	constructor(private paymentMethodRepository: PaymentMethodRepository) {}

	getPaymentMethod(): Observable<ListCustomerResponse<IPaymentMethod>> {
		return this.paymentMethodRepository.getPaymentMethod();
	}

	getPaymentMethod_pageparams(params: RequestParams): Observable<ListCustomerResponse<IPaymentMethod>> {
		return this.paymentMethodRepository.getPaymentMethod_allparams(params);
	}

	detailPaymentMethod(param: ParamsID): Observable<DetailCustomerResponse<IPaymentMethod>> {
		return this.paymentMethodRepository.detailPaymentMethod(param);
	}

	updatePaymentMethod(param: IPaymentMethod): Observable<UpdateCustomerResponse<IPaymentMethod>> {
		return this.paymentMethodRepository.updatePaymentMethod(param);
	}

	addPaymentMethod(data: IPaymentMethod): Observable<CreatePaymentMethodResponse<IPaymentMethod>> {
		return this.paymentMethodRepository.addPaymentMethod(data);
	}

	deletePaymentMethod(params: ParamsID): Observable<CreatePaymentMethodResponse<IPaymentMethod>> {
		return this.paymentMethodRepository.deletePaymentMethod(params);
	}
}
