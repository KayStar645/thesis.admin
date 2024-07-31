import { ICustomer } from '../customer/customer.request';
import { IProduct } from '../product/product.request';
import { IEmployee } from '../staff/employees.request';

export interface IOrder {
	id: number;
	internalCode?: string;
	date: string;
	total: number;
	totalAmount: number;
	totalDecrease: number;
	status: number;
	isPay: number;
	message: string;
	details: {
		price: number;
		cost: number;
		quantity: number;
		reducedPrice: number;
		product: IProduct;
	}[];
	paymentId: number;
	payment?: {};
	customer: ICustomer;
	customerId: number;
	deliveryId?: number;
	delivery?: {};
	staffApprovedId?: number;
	staffApproved?: IEmployee;
	isSelected?: boolean;
}
