import { IDistributor } from '../distributor/distributor.request';
import { IProduct } from '../product/product.request';
import { IEmployee } from '../staff/employees.request';

export interface IImportGoods {
	id: number;
	supplierOrderId: number;
	details: any[];
	isCancel: boolean;
	receivingStaff: string;
	approveStaff: IEmployee;
	bookingDate: string;
	distributor: IDistributor;
	internalCode: string;
	total: number;
	status: number;
	parentId: number;
}

export interface ImportGoodsDetail {
	importQuantity: number;
	productId: number;
	id?: number;
}
