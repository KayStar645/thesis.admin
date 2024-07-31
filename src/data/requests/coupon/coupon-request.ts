export interface ICoupon {
	id: number;
	internalCode: string;
	name: string;
	start: string;
	end: string;
	limit: number;
	type: number;
	discount: number;
	percentMax: number;
	percent: number;
	discountMax: number;
	typeC: number;
	customerId?: number;
	status: number;
}
