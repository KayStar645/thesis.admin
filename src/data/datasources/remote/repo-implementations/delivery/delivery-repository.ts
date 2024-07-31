import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IDelivery } from 'data/requests/delivery/delivery-request';
import { IUpdateDeliveryStatus } from 'data/requests/delivery/update-delivery-status-request';
import { ListDeliveryResponse } from 'data/responses/delivery/delivery-response';
import { DetailDeliveryResponse } from 'data/responses/delivery/detail-delivery-response';
import { IDeliveryRepository } from 'domain/repositories/i-delivery-reposity';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DeliveryRepository extends IDeliveryRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}

	override getDeliveries(params: RequestParams): Observable<ListDeliveryResponse> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);

		return this.http.get<ListDeliveryResponse>(`${this.apiUrl}/smw-api/delivery`, {
			params: httpParams,
		});
	}

	override addDelivery(params: IDelivery): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/smw-api/delivery`, params);
	}

	override updateDelivery(params: IDelivery): Observable<any> {
		return this.http.put<any>(`${this.apiUrl}/smw-api/delivery`, params);
	}

	override detailDelivery(params: ParamsID): Observable<DetailDeliveryResponse> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);

		return this.http.get<DetailDeliveryResponse>(`${this.apiUrl}/smw-api/delivery/detail`, {
			params: httpParams,
		});
	}

	override updateDeliveryStatus(params: IUpdateDeliveryStatus): Observable<any> {
		return this.http.patch(`${this.apiUrl}/smw-api/delivery/delivery-change-status`, params);
	}
}
