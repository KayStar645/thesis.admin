import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IImportGoods } from 'data/requests/import-goods/import-goods-request';
import { IUpdateStatusImportGoods } from 'data/requests/import-goods/update-status-product-request';
import { IProduct } from 'data/requests/product/product.request';
import { CreateImportGoodsResponse } from 'data/responses/import-goods/create-import-goods-responses';
import { DetailImportGoodsResponse } from 'data/responses/import-goods/detail-import-goods-responses';
import { ListImportGoodsResponse } from 'data/responses/import-goods/import-goods-responses';
import { UpdateImportGoodsResponse } from 'data/responses/import-goods/update-import-goods-responses';
import { UpdateStatusImportGoodsResponse } from 'data/responses/import-goods/update-status-import-goods-responses';
import { ListProductResponse } from 'data/responses/product/products.reponses';
import { IImportGoodsRepository } from 'domain/repositories/i-import-good-repository';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ImportGoodsRepository extends IImportGoodsRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}

	override getImportGoods(): Observable<ListImportGoodsResponse> {
		return this.http.get<ListImportGoodsResponse>(`${this.apiUrl}/smw-api/import-goods`);
	}

	override getImportGoods_allparams(params: RequestParams): Observable<ListImportGoodsResponse> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListImportGoodsResponse>(`${this.apiUrl}/smw-api/import-goods`, {
			params: httpParams,
		});
	}

	override getImportGoods_pageparams(params: RequestParams): Observable<ListImportGoodsResponse> {
		const httpParams = new HttpParams()
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListImportGoodsResponse>(`${this.apiUrl}/smw-api/import-goods`, {
			params: httpParams,
		});
	}
	override updateImportGoods(params: IImportGoods): Observable<UpdateImportGoodsResponse> {
		return this.http.put<UpdateImportGoodsResponse>(`${this.apiUrl}/smw-api/import-goods`, params);
	}
	override detailImportGoods(params: ParamsID): Observable<DetailImportGoodsResponse> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);
		return this.http.get<DetailImportGoodsResponse>(`${this.apiUrl}/smw-api/import-goods/detail`, {
			params: httpParams,
		});
	}

	override addImportGoods(params: IImportGoods): Observable<CreateImportGoodsResponse> {
		return this.http.post<CreateImportGoodsResponse>(`${this.apiUrl}/smw-api/import-goods`, params);
	}

	override deleteImportGoods(params: ParamsID): Observable<any> {
		const url = `${this.apiUrl}/smw-api/import-goods?Id=${params.Id}`;
		return this.http.delete<any>(url);
	}

	override updateStatusImportGoods(params: IUpdateStatusImportGoods): Observable<UpdateStatusImportGoodsResponse> {
		return this.http.patch<UpdateStatusImportGoodsResponse>(`${this.apiUrl}/smw-api/import-goods`, params);
	}
}
