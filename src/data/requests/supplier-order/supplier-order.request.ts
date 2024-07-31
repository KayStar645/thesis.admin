import { IDistributor } from '../distributor/distributor.request';
import { IEmployee } from '../staff/employees.request';
import { IProductSupplierOrder } from './create.supplier-order.request';

export interface ISupplierOrder {
	internalCode: string;
	bookingDate: string;
	total: number;
	deliver?: string | null;
	status: number;
	approveStaffId: number;
	approveStaff: IEmployee | null;
	distributorId: number;
	distributor: IDistributor | null;
	details: null | IProductSupplierOrder[];
	id: number;
	isChecked?: boolean;
}
