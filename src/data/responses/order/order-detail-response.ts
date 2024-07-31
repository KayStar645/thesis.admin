import { Result } from 'core/types/types';
import { IOrder } from 'data/requests/order/order-request';

export interface OrderDetailResponse extends Result<IOrder> {}
