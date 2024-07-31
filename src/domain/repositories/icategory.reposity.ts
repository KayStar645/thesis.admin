import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { RequestParams } from '../../core/params/requestParams';
import { ParamsID } from 'core/params/paramID';
import { ICategory } from 'data/requests/category/category.request';
import { ListCategoryResponse } from 'data/responses/category/categories.reponses';
import { CreateCategoryResponse } from 'data/responses/category/create.category.reponses';
import { DetailCategoryResponse } from 'data/responses/category/detail.category.reponses';
import { UpdateCategoryResponse } from 'data/responses/category/update.category.reponses';

@Injectable({ providedIn: 'root' })
export abstract class ICategoryRepository {
	abstract getCategories(): Observable<ListCategoryResponse<ICategory>>;
	abstract getCategories_pageparams(params: RequestParams): Observable<ListCategoryResponse<ICategory>>;

	abstract getCategories_allparams(params: RequestParams): Observable<ListCategoryResponse<ICategory>>;

	abstract addCategory(params: ICategory): Observable<CreateCategoryResponse<ICategory>>;

	abstract deleteCategory(params: ParamsID): Observable<any>;

	abstract updateCategory(params: ICategory): Observable<UpdateCategoryResponse<ICategory>>;

	abstract detailCategory(params: ParamsID): Observable<DetailCategoryResponse<ICategory>>;
}
