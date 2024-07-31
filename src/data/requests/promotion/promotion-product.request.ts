import { IProduct } from '../product/product.request';

export interface IPromotionProduct {
	group: number;
	groupProducts: {
		product: IProduct;
		productId: number;
	}[];
}
