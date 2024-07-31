import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IUpdateOrderStatus } from 'data/requests/order/update-order-status-request';
import { OrderDetailResponse } from 'data/responses/order/order-detail-response';
import { ListOrderResponse } from 'data/responses/order/order-response';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class IOrderRepository {
	abstract getOrders(params: RequestParams): Observable<ListOrderResponse>;

	abstract detailOrder(params: ParamsID): Observable<OrderDetailResponse>;

	abstract updateOrderStatus(params: IUpdateOrderStatus): Observable<any>;

	abstract cancelOrder(params: IUpdateOrderStatus): Observable<any>;
}
