// staff.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IProduct } from 'data/requests/product/product.request';
import { IUpdateStatusProduct } from 'data/requests/product/update.status.product.request';
import { CreateProductResponse } from 'data/responses/product/create.product.reponses';
import { DetailProductResponse } from 'data/responses/product/detail.product.reponses';
import { ListProductResponse } from 'data/responses/product/products.reponses';
import { UpdateProductResponse } from 'data/responses/product/update.product.reponses';
import { UpdateStatusProductResponse } from 'data/responses/product/update.status.reponses';
import { IProductRepository } from 'domain/repositories/iproduct.repository';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductRepository extends IProductRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}
	override getProducts(): Observable<ListProductResponse<IProduct>> {
		return this.http.get<ListProductResponse<IProduct>>(`${this.apiUrl}/smw-api/product`);
	}
	override getProducts_allparams(params: RequestParams): Observable<ListProductResponse<IProduct>> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListProductResponse<IProduct>>(`${this.apiUrl}/smw-api/product`, {
			params: httpParams,
		});
	}

	override getProducts_pageparams(params: RequestParams): Observable<ListProductResponse<IProduct>> {
		const httpParams = new HttpParams()
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListProductResponse<IProduct>>(`${this.apiUrl}/smw-api/product`, {
			params: httpParams,
		});
	}
	override updateProduct(params: IProduct): Observable<UpdateProductResponse<IProduct>> {
		return this.http.put<UpdateProductResponse<IProduct>>(`${this.apiUrl}/smw-api/product`, params);
	}
	override detailProduct(params: ParamsID): Observable<DetailProductResponse<IProduct>> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);
		return this.http.get<DetailProductResponse<IProduct>>(`${this.apiUrl}/smw-api/product/detail`, {
			params: httpParams,
		});
	}

	override addProduct(params: IProduct): Observable<CreateProductResponse<IProduct>> {
		return this.http.post<CreateProductResponse<IProduct>>(`${this.apiUrl}/smw-api/product`, params);
	}
	override deleteProduct(params: ParamsID): Observable<any> {
		const url = `${this.apiUrl}/smw-api/product?Id=${params.Id}`;
		return this.http.delete<any>(url);
	}
	override updateStatusProduct(params: IUpdateStatusProduct): Observable<UpdateStatusProductResponse> {
		return this.http.patch<UpdateStatusProductResponse>(`${this.apiUrl}/smw-api/product`, params);
	}
}
