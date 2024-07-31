import { Injectable } from '@angular/core';
import { CouponRepository } from 'data/datasources/remote/repo-implementations/coupon/coupon-repository';
import { ICoupon } from 'data/requests/coupon/coupon-request';
import { IUpdateCouponStatus } from 'data/requests/coupon/update-coupon-status';
import { ListCouponResponse } from 'data/responses/coupon/coupon-reponses';
import { DetailCouponResponse } from 'data/responses/coupon/detail-coupon-reponses';
import { Observable } from 'rxjs'; // Import of từ rxjs
import { ParamsID } from '../../../core/params/paramID';
import { RequestParams } from '../../../core/params/requestParams';

@Injectable({
	providedIn: 'root',
})
export class CouponService {
	constructor(private couponRepository: CouponRepository) {}

	getCoupon(): Observable<ListCouponResponse> {
		return this.couponRepository.getCoupons();
	}

	getCoupon_pageparams(params: RequestParams): Observable<ListCouponResponse> {
		return this.couponRepository.getCoupons_pageparams(params);
	}

	detailCoupon(param: ParamsID): Observable<DetailCouponResponse> {
		return this.couponRepository.detailCoupon(param);
	}

	updateCoupon(param: ICoupon): Observable<any> {
		return this.couponRepository.updateCoupon(param);
	}

	addCoupon(param: ICoupon): Observable<any> {
		return this.couponRepository.addCoupon(param);
	}

	updateStatusCoupon(param: IUpdateCouponStatus): Observable<any> {
		return this.couponRepository.UpdateStatusCoupon(param);
	}
}
