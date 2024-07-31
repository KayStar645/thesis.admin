import { api } from './api';

const queryKey: { [key in keyof typeof api]: any } = {
	role: {
		list: (filter?: any) => ['list', 'roles', filter],
		detail: (id?: number) => ['detail', 'role', id],
		listRoleWithController: () => ['list', 'roles-with-controller'],
	},
	staff: {
		list: (filter?: any) => ['list', 'staffs', filter],
		detail: (id?: number) => ['detail', 'staff', id],
	},
	position: {
		list: (filter?: any) => ['list', 'positions', filter],
		detail: (id?: number) => ['detail', 'position', id],
	},
	paymentMethod: {
		list: (filter?: any) => ['list', 'payment-methods', filter],
		detail: (id?: number) => ['detail', 'payment-method', id],
	},
	product: {
		list: (filter?: any) => ['list', 'products', filter],
		detail: (id?: number) => ['detail', 'product', id],
	},
	category: {
		list: (filter?: any) => ['list', 'categories', filter],
		detail: (id?: number) => ['detail', 'category', id],
	},
	promotion: {
		list: (filter?: any) => ['list', 'promotions', filter],
		detail: (id?: number) => ['detail', 'promotion', id],
	},
	distributor: {
		list: (filter?: any) => ['list', 'distributors', filter],
		detail: (id?: number) => ['detail', 'distributor', id],
	},
	importGoods: {
		list: (filter?: any) => ['list', 'import-goods', filter],
		detail: (id?: number) => ['detail', 'import-good', id],
	},
	supplierOrder: {
		list: (filter?: any) => ['list', 'supplier-orders', filter],
		detail: (id?: number) => ['detail', 'supplier-order', id],
	},
	coupon: {
		list: (filter?: any) => ['list', 'coupons', filter],
		detail: (id?: number) => ['detail', 'coupon', id],
	},
	customer: {
		list: (filter?: any) => ['list', 'customers', filter],
		detail: (id?: number) => ['detail', 'customer', id],
	},
	order: {
		list: (filter?: any) => ['list', 'orders', filter],
		detail: (id?: number) => ['detail', 'order', id],
	},
	delivery: {
		list: (filter?: any) => ['list', 'deliveries', filter],
		detail: (id?: number) => ['detail', 'delivery', id],
	},
	profit: {
		list: (filter?: any) => ['list', 'profits', filter],
		detail: (filter?: any) => ['detail', 'profit', filter],
	},
	supplierOrderProduct: {
		list: (filter?: any) => ['list', 'supplierOrderProducts', filter],
	},
	statsOrder: {
		list: (filter?: any) => ['list', 'order', filter],
	},
	statsOverview: {
		list: (filter?: any) => ['list', 'overview', filter],
	},
	statsInventory: {
		list: (filter?: any) => ['list', 'overview', filter],
	},
};

export { queryKey };
