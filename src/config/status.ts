export const statusPromotion: { id: number; name: string }[] = [
	{ id: 0, name: 'Nháp' },
	{ id: 1, name: 'Duyệt' },
	{ id: 2, name: 'Hủy bỏ' },
];

export const statusProduct: { label: string; id: number; describes: string }[] = [
	{ label: 'Nháp', id: 0, describes: 'Daft' },
	{ label: 'Đang bán', id: 1, describes: 'Active' },
	{ label: 'Tạm Ngưng', id: 2, describes: 'Pause' },
	{ label: 'Ngừng bán', id: 3, describes: 'Stop' },
	{ label: 'Hết hàng', id: 4, describes: 'OutStock' },
];

export const statusSupplierOrder: {
	label: string;
	id: number;
	describes: string;
}[] = [
	{ label: 'Nháp', id: 0, describes: 'Daft' },
	{ label: 'Đã đặt', id: 1, describes: 'Order' },
	{ label: 'Hủy', id: 2, describes: 'Cancel' },
	{ label: 'Đã thanh toán', id: 3, describes: 'Completed' },
	{ label: 'Thanh toán một phần', id: 4, describes: 'Partial Receipt' },
];

export const statusCoupon: {
	label: string;
	id: number;
	describes: string;
}[] = [
	{ label: 'Nháp', id: 0, describes: 'Daft' },
	{ label: 'Duyệt', id: 1, describes: 'Order' },
	{ label: 'Hủy', id: 2, describes: 'Cancel' },
];

export const statusOrder: {
	label: string;
	id: number;
}[] = [
	{ label: 'Trong giỏ hàng', id: 0 },
	{ label: 'Đặt hàng', id: 1 },
	{ label: 'Duyệt', id: 2 },
	{ label: 'Vận chuyển', id: 3 },
	{ label: 'Đã nhận', id: 4 },
	{ label: 'Hủy', id: 5 },
];

export const statusDelivery: {
	label: string;
	id: number;
}[] = [
	{ label: 'Chuẩn bị', id: 0 },
	{ label: 'Vận chuyển', id: 1 },
	{ label: 'Đã giao hàng', id: 2 },
	{ label: 'Đã nhận', id: 3 },
	{ label: 'Hủy', id: 4 },
];
