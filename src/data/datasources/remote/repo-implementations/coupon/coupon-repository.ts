import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { ICoupon } from 'data/requests/coupon/coupon-request';
import { IUpdateCouponStatus } from 'data/requests/coupon/update-coupon-status';
import { ListCouponResponse } from 'data/responses/coupon/coupon-reponses';
import { DetailCouponResponse } from 'data/responses/coupon/detail-coupon-reponses';
import { ICouponRepository } from 'domain/repositories/i-coupon.reposity';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CouponRepository extends ICouponRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}

	override getCoupons(): Observable<ListCouponResponse> {
		return this.http.get<ListCouponResponse>(`${this.apiUrl}/smw-api/coupon`);
	}

	override getCoupons_allparams(params: RequestParams): Observable<ListCouponResponse> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);

		return this.http.get<ListCouponResponse>(`${this.apiUrl}/smw-api/coupon`, {
			params: httpParams,
		});
	}

	override getCoupons_pageparams(params: RequestParams): Observable<ListCouponResponse> {
		const httpParams = new HttpParams()
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListCouponResponse>(`${this.apiUrl}/smw-api/coupon`, {
			params: httpParams,
		});
	}

	override updateCoupon(params: ICoupon): Observable<any> {
		return this.http.put<any>(`${this.apiUrl}/smw-api/coupon`, params);
	}

	override detailCoupon(params: ParamsID): Observable<DetailCouponResponse> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);
		return this.http.get<DetailCouponResponse>(`${this.apiUrl}/smw-api/coupon/detail`, {
			params: httpParams,
		});
	}

	override addCoupon(params: ICoupon): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/smw-api/coupon`, params);
	}

	override UpdateStatusCoupon(params: IUpdateCouponStatus): Observable<any> {
		return this.http.patch<any>(`${this.apiUrl}/smw-api/coupon`, params);
	}
}
