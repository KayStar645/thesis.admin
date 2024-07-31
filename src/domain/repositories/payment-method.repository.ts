import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IPaymentMethod } from 'data/requests/payment-method/payment-method.request';
import { CreatePaymentMethodResponse } from 'data/responses/payment-method/create.payment-method.reponses';
import { DetailPaymentMethodResponse } from 'data/responses/payment-method/detail.payment-method.reponses';
import { ListPaymentMethodResponse } from 'data/responses/payment-method/payment-method.reponses';
import { UpdatePaymentMethodResponse } from 'data/responses/payment-method/update.payment-method.reponses';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class IPaymentMethodRepository {
	abstract getPaymentMethod(): Observable<ListPaymentMethodResponse<IPaymentMethod>>;

	abstract getPaymentMethod_pageparams(params: RequestParams): Observable<ListPaymentMethodResponse<IPaymentMethod>>;

	abstract getPaymentMethod_allparams(params: RequestParams): Observable<ListPaymentMethodResponse<IPaymentMethod>>;

	abstract detailPaymentMethod(params: ParamsID): Observable<DetailPaymentMethodResponse<IPaymentMethod>>;

	abstract updatePaymentMethod(params: IPaymentMethod): Observable<UpdatePaymentMethodResponse<IPaymentMethod>>;

	abstract addPaymentMethod(data: IPaymentMethod): Observable<CreatePaymentMethodResponse<IPaymentMethod>>;

	abstract deletePaymentMethod(params: ParamsID): Observable<any>;
}
