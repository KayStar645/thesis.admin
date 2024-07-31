import { statusProduct } from 'config/status';
import { ICategory } from '../category/category.request';

export interface IProduct {
	internalCode?: string;
	name?: string;
	images: string[];
	price: number;
	newPrice?: number;
	stockPrice?: number;
	describes?: string;
	feature?: string;
	specifications?: string;
	status?: (typeof statusProduct)[number]['id'];
	categoryId?: number;
	category?: ICategory | null;
	id: number;
	quantity?: number;
	isChecked?: boolean | false;
	purchased?: number;
	stock?: number;
	importQuantity?: number;
	orderQuantity?: number;
}
