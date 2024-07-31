import { OptionTpe } from 'core/types/types';

const DEFAULT_REDIRECT = '/admin/dashboard/main';

const menu: OptionTpe[] = [
	{
		code: 'dashboard',
		label: 'Thống kê - báo cáo',
		icon: 'fa-solid fa-chart-line',
		// to: '/admin/dashboard',
		options: [
			{
				code: 'statistic',
				label: 'Thống kê',
				to: '/admin/dashboard/statistic',
				permissions: ['statistical.view'],
			},
			{
				code: 'report',
				label: 'Lợi nhuận theo nhóm',
				to: '/admin/dashboard/report',
				permissions: ['report.view'],
			},
			{
				code: 'report',
				label: 'Lợi nhuận theo nhóm KM',
				to: '/admin/dashboard/report-promotion',
				permissions: ['report.view'],
			},
		],
	},
	{
		code: 'master-data',
		label: 'Dữ liệu nguồn',
		icon: 'fa-solid fa-boxes-stacked',
		// to: '/admin/master-data',
		shouldShow: false,
		options: [
			{
				code: 'distributor',
				label: 'Nhà cung cấp',
				to: '/admin/master-data/distributor',
				permissions: ['distributor.view'],
			},
			// {
			// 	code: 'payment-method',
			// 	label: 'Phương thức thanh toán',
			// 	to: '/admin/master-data/payment-method',
			// 	permissions: ['payment.view'],
			// },
			{
				code: 'category',
				label: 'Loại sản phẩm',
				to: '/admin/master-data/category',
				permissions: ['category.view'],
			},
			{
				code: 'product',
				label: 'Sản phẩm',
				to: '/admin/master-data/product',
				permissions: ['product.view'],
			},
		],
	},
	{
		code: 'business',
		label: 'Kinh doanh',
		icon: 'fa-solid fa-coins',
		// to: '/admin/business',
		options: [
			{
				code: 'supplier-order',
				label: 'Đơn đặt hàng',
				to: '/admin/business/supplier-order',
				permissions: ['supplier-order.view'],
			},
			{
				code: 'import-goods',
				label: 'Đơn nhập hàng',
				to: '/admin/business/import-goods',
				permissions: ['import-good.view'],
				shouldShow: true,
			},
			{
				code: 'order',
				label: 'Đơn hàng',
				to: '/admin/business/order',
				permissions: ['order.view'],
			},
			// {
			// 	code: 'delivery',
			// 	label: 'Giao hàng',
			// 	to: '/admin/business/delivery',
			// 	permissions: ['delivery.view'],
			// },
			{
				code: 'promotion',
				label: 'Khuyến mãi',
				to: '/admin/business/promotion',
				permissions: ['promotion.view'],
			},
			{
				code: 'coupon',
				label: 'Mã giảm giá',
				to: '/admin/business/coupon',
				permissions: ['coupon.view'],
			},
			{
				code: 'profit',
				label: 'Lợi nhuận',
				to: '/admin/dashboard/profit',
				permissions: ['statistical.view'],
				shouldShow: true,
			},
		],
	},
	{
		code: 'system',
		label: 'Hệ thống',
		icon: 'fa-solid fa-gears',
		// to: '/admin/system',
		shouldShow: false,
		options: [
			{
				code: 'customer',
				label: 'Khách hàng',
				to: '/admin/business/customer',
				permissions: ['customer.view'],
			},
			{
				code: 'staff',
				label: 'Nhân viên',
				to: '/admin/system/staff',
				permissions: ['staff.view'],
			},
			{
				code: 'position',
				label: 'Chức vụ',
				to: '/admin/system/position',
				permissions: ['staff-position.view'],
			},
			{
				code: 'role',
				label: 'Vai trò',
				to: '/admin/system/role',
				permissions: ['role.view'],
			},
		],
	},
];

export { menu, DEFAULT_REDIRECT };
