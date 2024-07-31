import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { DeliveryRepository } from 'data/datasources/remote/repo-implementations/delivery/delivery-repository';
import { IDelivery } from 'data/requests/delivery/delivery-request';
import { IUpdateDeliveryStatus } from 'data/requests/delivery/update-delivery-status-request';
import { ListDeliveryResponse } from 'data/responses/delivery/delivery-response';
import { DetailDeliveryResponse } from 'data/responses/delivery/detail-delivery-response';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DeliveryService {
	constructor(private categoryRepository: DeliveryRepository) {}

	getDeliveries(params: RequestParams): Observable<ListDeliveryResponse> {
		return this.categoryRepository.getDeliveries(params);
	}

	detailDelivery(param: ParamsID): Observable<DetailDeliveryResponse> {
		return this.categoryRepository.detailDelivery(param);
	}

	updateDelivery(param: IDelivery): Observable<any> {
		return this.categoryRepository.updateDelivery(param);
	}

	addDelivery(param: IDelivery): Observable<any> {
		return this.categoryRepository.addDelivery(param);
	}

	updateDeliveryStatus(param: IUpdateDeliveryStatus): Observable<any> {
		return this.categoryRepository.updateDeliveryStatus(param);
	}
}
