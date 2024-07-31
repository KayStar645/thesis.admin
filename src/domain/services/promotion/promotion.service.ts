import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Import of từ rxjs
import { RequestParams } from '../../../core/params/requestParams';
import { ParamsID } from '../../../core/params/paramID';
import { PromotionRepository } from 'data/datasources/remote/repo-implementations/promotion/promotion.repository';
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

@Injectable({
	providedIn: 'root',
})
export class PromotionService {
	constructor(private promotionRepository: PromotionRepository) {}

	getPromotion(): Observable<ListPromotionResponse<IPromotion>> {
		return this.promotionRepository.getPromotions();
	}

	getPromotion_pageparams(params: RequestParams): Observable<ListPromotionResponse<IPromotion>> {
		return this.promotionRepository.getPromotions_allparams(params);
	}
	detailPromotion(param: ParamsID): Observable<DetailPromotionResponse<IDetailPromotion>> {
		return this.promotionRepository.detailPromotion(param);
	}
	updatePromotion(param: IPromotion): Observable<UpdatePromotionResponse<IPromotion>> {
		return this.promotionRepository.updatePromotion(param);
	}
	deletePromotion(param: ParamsID): Observable<any> {
		return this.promotionRepository.deletePromotion(param);
	}
	addPromotion(param: IPromotion): Observable<CreatePromotionResponse<IPromotion>> {
		return this.promotionRepository.addPromotion(param);
	}

	updateStatusPromotion(param: IUpdateStatusPromotion): Observable<UpdateStatusPromotionResponse<IPromotion>> {
		return this.promotionRepository.UpdateStatusPromotion(param);
	}
	updatePromotionForProduct(param: IApplyPromotionProduct): Observable<UpdatePromotionForProductResponse> {
		return this.promotionRepository.UpdatePromotionForProduct(param);
	}
}
