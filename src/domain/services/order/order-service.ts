import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { OrderRepository } from 'data/datasources/remote/repo-implementations/order/order-repository';
import { IUpdateOrderStatus } from 'data/requests/order/update-order-status-request';
import { OrderDetailResponse } from 'data/responses/order/order-detail-response';
import { ListOrderResponse } from 'data/responses/order/order-response';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	constructor(private orderRepository: OrderRepository) {}

	getOrder(params: RequestParams): Observable<ListOrderResponse> {
		return this.orderRepository.getOrders(params);
	}

	detailOrder(param: ParamsID): Observable<OrderDetailResponse> {
		return this.orderRepository.detailOrder(param);
	}

	updateOrderStatus(param: IUpdateOrderStatus): Observable<any> {
		return this.orderRepository.updateOrderStatus(param);
	}

	cancelOrder(param: IUpdateOrderStatus): Observable<any> {
		return this.orderRepository.cancelOrder(param);
	}
}
