// staff.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IProduct } from 'data/requests/product/product.request';
import { ICreateSupplierOrder } from 'data/requests/supplier-order/create.supplier-order.request';
import { ISupplierOrder } from 'data/requests/supplier-order/supplier-order.request';
import { IUpdateStatusSupplierOrder } from 'data/requests/supplier-order/update.status.supplier-order.request';
import { IUpdateSupplierOrder } from 'data/requests/supplier-order/update.supplier-order.request';
import { ListProductResponse } from 'data/responses/product/products.reponses';
import { CreateSupplierOrderResponse } from 'data/responses/supplier-order/create.supplier-order.reponses';
import { DetailSupplierOrderResponse } from 'data/responses/supplier-order/detail.supplier-order.reponses';
import { ListSupplierOrderResponse } from 'data/responses/supplier-order/supplier-orders.reponses';
import { UpdateStatusSupplierOrderResponse } from 'data/responses/supplier-order/update.status.supplier-order.reponses';
import { UpdateSupplierOrderResponse } from 'data/responses/supplier-order/update.supplier-order.reponses';
import { ISupplierOrderRepository } from 'domain/repositories/i-supplier-order.repository';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SupplierOrderRepository extends ISupplierOrderRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}
	override getSupplierOrders(params: RequestParams): Observable<ListSupplierOrderResponse<ISupplierOrder>> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListSupplierOrderResponse<ISupplierOrder>>(`${this.apiUrl}/smw-api/supplier-order`, {
			params: httpParams,
		});
	}

	override updateSupplierOrder(
		params: IUpdateSupplierOrder,
	): Observable<UpdateSupplierOrderResponse<ISupplierOrder>> {
		return this.http.put<UpdateSupplierOrderResponse<ISupplierOrder>>(
			`${this.apiUrl}/smw-api/supplier-order`,
			params,
		);
	}
	override detailSupplierOrder(params: ParamsID): Observable<DetailSupplierOrderResponse<ISupplierOrder>> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);
		return this.http.get<DetailSupplierOrderResponse<ISupplierOrder>>(
			`${this.apiUrl}/smw-api/supplier-order/detail`,
			{ params: httpParams },
		);
	}

	override addSupplierOrder(params: ICreateSupplierOrder): Observable<CreateSupplierOrderResponse<ISupplierOrder>> {
		return this.http.post<CreateSupplierOrderResponse<ISupplierOrder>>(
			`${this.apiUrl}/smw-api/supplier-order`,
			params,
		);
	}

	override UpdateStatusSupplierOrder(
		params: IUpdateStatusSupplierOrder,
	): Observable<UpdateStatusSupplierOrderResponse> {
		return this.http.patch<UpdateStatusSupplierOrderResponse>(
			`${this.apiUrl}/smw-api/supplier-order/change-status`,
			params,
		);
	}

	override getProducts(params: ParamsID): Observable<ListProductResponse<IProduct>> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);

		return this.http.get<ListProductResponse<IProduct>>(`${this.apiUrl}/smw-api/supplier-order/list-product`, {
			params: httpParams,
		});
	}
}
