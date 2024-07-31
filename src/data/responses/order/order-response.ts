import { ResultList, ExtraList } from 'core/types/types';
import { IOrder } from 'data/requests/order/order-request';

export interface ListOrderResponse extends ResultList<IOrder> {
	extra: ExtraList;
}
