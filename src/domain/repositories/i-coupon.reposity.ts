import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { ICoupon } from 'data/requests/coupon/coupon-request';
import { IUpdateCouponStatus } from 'data/requests/coupon/update-coupon-status';
import { ListCouponResponse } from 'data/responses/coupon/coupon-reponses';
import { DetailCouponResponse } from 'data/responses/coupon/detail-coupon-reponses';
import { RequestParams } from '../../core/params/requestParams';

@Injectable({ providedIn: 'root' })
export abstract class ICouponRepository {
	abstract getCoupons(): Observable<ListCouponResponse>;

	abstract getCoupons_pageparams(params: RequestParams): Observable<ListCouponResponse>;

	abstract getCoupons_allparams(params: RequestParams): Observable<ListCouponResponse>;

	abstract addCoupon(params: ICoupon): Observable<any>;

	abstract updateCoupon(params: ICoupon): Observable<any>;

	abstract detailCoupon(params: ParamsID): Observable<DetailCouponResponse>;

	abstract UpdateStatusCoupon(params: IUpdateCouponStatus): Observable<any>;
}
