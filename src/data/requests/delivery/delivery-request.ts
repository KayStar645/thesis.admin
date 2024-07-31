export interface IDelivery {
	id: number;
	from: string;
	to: string;
	transportFee: number;
	orderId: number;
	status: number;
}
