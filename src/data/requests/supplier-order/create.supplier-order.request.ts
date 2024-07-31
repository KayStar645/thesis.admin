import { IProduct } from '../product/product.request';

export interface ICreateSupplierOrder {
	distributorId: number;
	details: IProductSupplierOrder[];
}

export interface IProductSupplierOrder {
	price: number;
	quantity?: number;
	productId?: number;
	product?: IProduct | null;
}
