import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IOrder } from 'data/requests/order/order-request';
import { IUpdateOrderStatus } from 'data/requests/order/update-order-status-request';
import { OrderDetailResponse } from 'data/responses/order/order-detail-response';
import { ListOrderResponse } from 'data/responses/order/order-response';
import { IOrderRepository } from 'domain/repositories/i-order-repository';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class OrderRepository extends IOrderRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}

	override getOrders(params: RequestParams): Observable<ListOrderResponse> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);

		return this.http.get<ListOrderResponse>(`${this.apiUrl}/smw-api/order`, {
			params: httpParams,
		});
	}

	override detailOrder(params: ParamsID): Observable<OrderDetailResponse> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);

		return this.http.get<OrderDetailResponse>(`${this.apiUrl}/smw-api/order/detail`, {
			params: httpParams,
		});
	}

	override updateOrderStatus(params: IUpdateOrderStatus): Observable<any> {
		return this.http.patch(`${this.apiUrl}/smw-api/order/order-change-status`, params);
	}

	override cancelOrder(params: IUpdateOrderStatus): Observable<any> {
		return this.http.patch(`${this.apiUrl}/smw-api/order/order-cancel`, params);
	}
}
