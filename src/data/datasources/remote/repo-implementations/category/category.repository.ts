// staff.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { ICategory } from 'data/requests/category/category.request';
import { ListCategoryResponse } from 'data/responses/category/categories.reponses';
import { CreateCategoryResponse } from 'data/responses/category/create.category.reponses';
import { DetailCategoryResponse } from 'data/responses/category/detail.category.reponses';
import { UpdateCategoryResponse } from 'data/responses/category/update.category.reponses';
import { ICategoryRepository } from 'domain/repositories/icategory.reposity';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CategoryRepository extends ICategoryRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}
	override getCategories(): Observable<ListCategoryResponse<ICategory>> {
		return this.http.get<ListCategoryResponse<ICategory>>(`${this.apiUrl}/smw-api/category`);
	}
	override getCategories_allparams(params: RequestParams): Observable<ListCategoryResponse<ICategory>> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListCategoryResponse<ICategory>>(`${this.apiUrl}/smw-api/category`, {
			params: httpParams,
		});
	}

	override getCategories_pageparams(params: RequestParams): Observable<ListCategoryResponse<ICategory>> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListCategoryResponse<ICategory>>(`${this.apiUrl}/smw-api/category`, {
			params: httpParams,
		});
	}
	override updateCategory(params: ICategory): Observable<UpdateCategoryResponse<ICategory>> {
		return this.http.put<UpdateCategoryResponse<ICategory>>(`${this.apiUrl}/smw-api/category`, params);
	}
	override detailCategory(params: ParamsID): Observable<DetailCategoryResponse<ICategory>> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);
		return this.http.get<DetailCategoryResponse<ICategory>>(`${this.apiUrl}/smw-api/category/detail`, {
			params: httpParams,
		});
	}

	override addCategory(params: ICategory): Observable<CreateCategoryResponse<ICategory>> {
		return this.http.post<CreateCategoryResponse<ICategory>>(`${this.apiUrl}/smw-api/category`, params);
	}
	override deleteCategory(params: ParamsID): Observable<any> {
		const url = `${this.apiUrl}/smw-api/category?Id=${params.Id}`;
		return this.http.delete<any>(url);
	}
}
