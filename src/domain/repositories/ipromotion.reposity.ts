import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { RequestParams } from '../../core/params/requestParams';
import { ParamsID } from 'core/params/paramID';
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

@Injectable({ providedIn: 'root' })
export abstract class IPromotionRepository {
	abstract getPromotions(): Observable<ListPromotionResponse<IPromotion>>;
	abstract getPromotions_pageparams(params: RequestParams): Observable<ListPromotionResponse<IPromotion>>;

	abstract getPromotions_allparams(params: RequestParams): Observable<ListPromotionResponse<IPromotion>>;

	abstract addPromotion(params: IPromotion): Observable<CreatePromotionResponse<IPromotion>>;

	abstract deletePromotion(params: ParamsID): Observable<any>;

	abstract updatePromotion(params: IPromotion): Observable<UpdatePromotionResponse<IPromotion>>;

	abstract detailPromotion(params: ParamsID): Observable<DetailPromotionResponse<IDetailPromotion>>;

	abstract UpdateStatusPromotion(
		params: IUpdateStatusPromotion,
	): Observable<UpdateStatusPromotionResponse<IPromotion>>;
	abstract UpdatePromotionForProduct(params: IApplyPromotionProduct): Observable<UpdatePromotionForProductResponse>;
}
