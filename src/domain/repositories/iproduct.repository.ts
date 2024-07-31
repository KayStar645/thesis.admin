import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RequestParams } from '../../core/params/requestParams';
import { ParamsID } from 'core/params/paramID';
import { IProduct } from 'data/requests/product/product.request';
import { IUpdateStatusProduct } from 'data/requests/product/update.status.product.request';
import { CreateProductResponse } from 'data/responses/product/create.product.reponses';
import { DetailProductResponse } from 'data/responses/product/detail.product.reponses';
import { ListProductResponse } from 'data/responses/product/products.reponses';
import { UpdateProductResponse } from 'data/responses/product/update.product.reponses';
import { UpdateStatusProductResponse } from 'data/responses/product/update.status.reponses';

@Injectable({ providedIn: 'root' })
export abstract class IProductRepository {
	abstract getProducts(): Observable<ListProductResponse<IProduct>>;
	abstract getProducts_pageparams(params: RequestParams): Observable<ListProductResponse<IProduct>>;

	abstract getProducts_allparams(params: RequestParams): Observable<ListProductResponse<IProduct>>;

	abstract addProduct(params: IProduct): Observable<CreateProductResponse<IProduct>>;

	abstract deleteProduct(params: ParamsID): Observable<any>;

	abstract updateProduct(params: IProduct): Observable<UpdateProductResponse<IProduct>>;

	abstract detailProduct(params: ParamsID): Observable<DetailProductResponse<IProduct>>;

	abstract updateStatusProduct(params: IUpdateStatusProduct): Observable<UpdateStatusProductResponse>;
}
