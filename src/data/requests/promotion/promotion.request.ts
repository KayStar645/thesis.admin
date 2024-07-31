import { IPromotionProduct } from './promotion-product.request';

export interface IPromotion {
	id: number;
	internalCode: string;
	name: string;
	start: string;
	end: string;
	limit: number;
	discount: number;
	percentMax: number;
	percent: number;
	discountMax: number;
	type?: number;
	isChecked?: boolean;
	status?: number;
	promotionForProduct: IPromotionProduct[];
}
