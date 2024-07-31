// staff.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPromotionRepository } from 'domain/repositories/ipromotion.reposity';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IApplyPromotionProduct } from 'data/requests/promotion/apply.promotion.product.request';
import { IDetailPromotion } from 'data/requests/promotion/detail.promotion.request';
import { IPromotion } from 'data/requests/promotion/promotion.request';
import { IUpdateStatusPromotion } from 'data/requests/promotion/update.status.promotion.request';
import { UpdatePromotionForProductResponse } from 'data/responses/promotion/apply.promotion.product.reponses';
import { CreatePromotionResponse } from 'data/responses/promotion/create.promotion.reponses';
import { DetailPromotionResponse } from 'data/responses/promotion/detail.promotion.reponses';
import { ListPromotionResponse } from 'data/responses/promotion/promotions.reponses';
import { UpdatePromotionResponse } from 'data/responses/promotion/update.promotion.reponses';
import { UpdateStatusPromotionResponse } from 'data/responses/promotion/update.status.promotion.reponses';
import { environment } from 'environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class PromotionRepository extends IPromotionRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}
	override getPromotions(): Observable<ListPromotionResponse<IPromotion>> {
		return this.http.get<ListPromotionResponse<IPromotion>>(`${this.apiUrl}/smw-api/promotion`);
	}
	override getPromotions_allparams(params: RequestParams): Observable<ListPromotionResponse<IPromotion>> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListPromotionResponse<IPromotion>>(`${this.apiUrl}/smw-api/promotion`, {
			params: httpParams,
		});
	}

	override getPromotions_pageparams(params: RequestParams): Observable<ListPromotionResponse<IPromotion>> {
		const httpParams = new HttpParams()
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListPromotionResponse<IPromotion>>(`${this.apiUrl}/smw-api/promotion`, {
			params: httpParams,
		});
	}
	override updatePromotion(params: IPromotion): Observable<UpdatePromotionResponse<IPromotion>> {
		return this.http.put<UpdatePromotionResponse<IPromotion>>(`${this.apiUrl}/smw-api/promotion`, params);
	}
	override detailPromotion(params: ParamsID): Observable<DetailPromotionResponse<IDetailPromotion>> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);
		return this.http.get<DetailPromotionResponse<IDetailPromotion>>(`${this.apiUrl}/smw-api/promotion/detail`, {
			params: httpParams,
		});
	}

	override addPromotion(params: IPromotion): Observable<CreatePromotionResponse<IPromotion>> {
		return this.http.post<CreatePromotionResponse<IPromotion>>(`${this.apiUrl}/smw-api/promotion`, params);
	}
	override deletePromotion(params: ParamsID): Observable<any> {
		const url = `${this.apiUrl}/smw-api/promotion?Id=${params.Id}`;
		return this.http.delete<any>(url);
	}

	override UpdateStatusPromotion(
		params: IUpdateStatusPromotion,
	): Observable<UpdateStatusPromotionResponse<IPromotion>> {
		return this.http.patch<UpdatePromotionResponse<IPromotion>>(`${this.apiUrl}/smw-api/promotion`, params);
	}

	override UpdatePromotionForProduct(params: IApplyPromotionProduct): Observable<UpdatePromotionForProductResponse> {
		return this.http.post<UpdatePromotionForProductResponse>(`${this.apiUrl}/smw-api/promotion/apply`, params);
	}
}
