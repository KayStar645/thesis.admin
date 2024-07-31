import { IProductSupplierOrder } from './create.supplier-order.request';

export interface IUpdateSupplierOrder {
	id: number;
	distributorId: number;
	details: IProductSupplierOrder[];
}
