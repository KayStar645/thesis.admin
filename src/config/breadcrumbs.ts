import { IBreadcrumb } from '../app/admin/_services/breadcrumbs/breadcrumb.interface';

export const breadcrumbsProfit: IBreadcrumb[] = [
	{ label: 'Kinh doanh', url: '/admin/business' },
	{ label: 'Lợi nhuận', url: '/admin/dashboard/profit' },
];

export const breadcrumbsPromotion: IBreadcrumb[] = [
	{ label: 'Dữ liệu nguồn', url: '/admin/master-data' },
	{ label: 'Khuyến mãi', url: '/admin/master-data/promotion' },
];

export const breadcrumbsProduct: IBreadcrumb[] = [
	{ label: 'Dữ liệu nguồn', url: '/admin/master-data' },
	{ label: 'Sản phẩm', url: '/admin/master-data/product' },
];

export const breadcrumbsCategory: IBreadcrumb[] = [
	{ label: 'Dữ liệu nguồn', url: '/admin/master-data' },
	{ label: 'Loại sản phẩm', url: '/admin/master-data/category' },
];

export const breadcrumbsPaymentMethod: IBreadcrumb[] = [
	{ label: 'Dữ liệu nguồn', url: '/admin/master-data' },
	{ label: 'Phương thức thanh toán', url: '/admin/master-data/payment-method' },
];

export const breadcrumbsSupplierOrder: IBreadcrumb[] = [
	{ label: 'Kinh doanh', url: '/admin/business/' },
	{ label: 'Lập phiếu nhập', url: '/admin/business/supplier-order' },
];

export const breadcrumbsDistributor: IBreadcrumb[] = [
	{ label: 'Dữ liệu nguồn', url: '/admin/master-data/' },
	{ label: 'Nhà cung cấp', url: '/admin/master-data/distributor' },
];

export const breadcrumbsImportGoods: IBreadcrumb[] = [
	{ label: 'Kinh doanh', url: '/admin/business/' },
	{ label: 'Hóa đơn nhập hàng', url: '/admin/business/import-goods' },
];

export const breadcrumbsCoupon: IBreadcrumb[] = [
	{ label: 'Kinh doanh', url: '/admin/business' },
	{ label: 'Mã giảm giá', url: '/admin/business/coupon' },
];

export const breadcrumbsDelivery: IBreadcrumb[] = [
	{ label: 'Kinh doanh', url: '/admin/business' },
	{ label: 'Vận chuyển', url: '/admin/business/delivery' },
];

export const breadcrumbsCustomer: IBreadcrumb[] = [
	{ label: 'Hệ thống', url: '/admin/system/' },
	{ label: 'Khách hàng', url: '/customer' },
];

export const breadcrumbsStaff: IBreadcrumb[] = [
	{ label: 'Hệ thống', url: '/admin/system/' },
	{ label: 'Nhân viên', url: '/admin/system/staff' },
];

export const breadcrumbsStaffPosition: IBreadcrumb[] = [
	{ label: 'Hệ thống', url: '/admin/system/' },
	{ label: 'Chức vụ', url: '/admin/system/position' },
];

export const breadcrumbsOrder: IBreadcrumb[] = [
	{ label: 'Hệ thống', url: '/admin/system' },
	{ label: 'Đặt hàng', url: '/admin/system/order' },
];

export const breadcrumbsRole: IBreadcrumb[] = [
	{ label: 'Hệ thống', url: '/admin/system' },
	{ label: 'Vai trò', url: '/admin/system/role' },
];

export const breadcrumbsReport: IBreadcrumb[] = [
	{ label: 'Thống kê - báo cáo', url: '/admin/dashboard' },
	{ label: 'Lợi nhuận theo nhóm', url: '/admin/dashboard/report' },
];
