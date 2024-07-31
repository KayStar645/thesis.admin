import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { ProductRepository } from 'data/datasources/remote/repo-implementations/product/product.repository';
import { IProduct } from 'data/requests/product/product.request';
import { IUpdateStatusProduct } from 'data/requests/product/update.status.product.request';
import { CreateProductResponse } from 'data/responses/product/create.product.reponses';
import { DetailProductResponse } from 'data/responses/product/detail.product.reponses';
import { ListProductResponse } from 'data/responses/product/products.reponses';
import { UpdateProductResponse } from 'data/responses/product/update.product.reponses';
import { UpdateStatusProductResponse } from 'data/responses/product/update.status.reponses';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(private productRepository: ProductRepository) {}

	getProduct(params: RequestParams): Observable<ListProductResponse<IProduct>> {
		return this.productRepository.getProducts_allparams(params);
	}

	getProduct_pageparams(params: RequestParams): Observable<ListProductResponse<IProduct>> {
		return this.productRepository.getProducts_pageparams(params);
	}
	detailProduct(param: ParamsID): Observable<DetailProductResponse<IProduct>> {
		return this.productRepository.detailProduct(param);
	}
	updateProduct(param: IProduct): Observable<UpdateProductResponse<IProduct>> {
		return this.productRepository.updateProduct(param);
	}
	deleteProduct(param: ParamsID): Observable<any> {
		return this.productRepository.deleteProduct(param);
	}
	addProduct(param: IProduct): Observable<CreateProductResponse<IProduct>> {
		return this.productRepository.addProduct(param);
	}
	updateStatusProduct(param: IUpdateStatusProduct): Observable<UpdateStatusProductResponse> {
		return this.productRepository.updateStatusProduct(param);
	}
}
