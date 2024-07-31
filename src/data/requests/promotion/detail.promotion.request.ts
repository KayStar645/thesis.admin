import { statusPromotion } from 'config/status';
import { IProduct } from '../product/product.request';

export interface IDetailPromotion {
	internalCode: string;
	name: string;
	start: string;
	end: string;
	limit: number;
	discount: number;
	percentMax: number;
	percent: number;
	discountMax: number;
	type: number;
	status: (typeof statusPromotion)[number]['id'];
	promotionForProduct: PromotionForProduct[];
	id: number;
}
export interface PromotionForProduct {
	groupProducts: number[];
	group: number;
	index?: number;
}
interface Product {
	product: IProduct;
	productid: number;
}
