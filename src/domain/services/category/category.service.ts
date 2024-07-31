import { Injectable } from '@angular/core';
import { CategoryRepository } from 'data/datasources/remote/repo-implementations/category/category.repository';
import { ICategory } from 'data/requests/category/category.request';
import { ListCategoryResponse } from 'data/responses/category/categories.reponses';
import { CreateCategoryResponse } from 'data/responses/category/create.category.reponses';
import { DetailCategoryResponse } from 'data/responses/category/detail.category.reponses';
import { UpdateCategoryResponse } from 'data/responses/category/update.category.reponses';
import { Observable } from 'rxjs'; // Import of từ rxjs
import { ParamsID } from '../../../core/params/paramID';
import { RequestParams } from '../../../core/params/requestParams';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	constructor(private categoryRepository: CategoryRepository) {}

	getCategory(): Observable<ListCategoryResponse<ICategory>> {
		return this.categoryRepository.getCategories();
	}

	getCategory_pageparams(params: RequestParams): Observable<ListCategoryResponse<ICategory>> {
		return this.categoryRepository.getCategories_pageparams(params);
	}
	detailCategory(param: ParamsID): Observable<DetailCategoryResponse<ICategory>> {
		return this.categoryRepository.detailCategory(param);
	}
	updateCategory(param: ICategory): Observable<UpdateCategoryResponse<ICategory>> {
		return this.categoryRepository.updateCategory(param);
	}
	deleteCategory(param: ParamsID): Observable<any> {
		return this.categoryRepository.deleteCategory(param);
	}
	addCategory(param: ICategory): Observable<CreateCategoryResponse<ICategory>> {
		return this.categoryRepository.addCategory(param);
	}
}
