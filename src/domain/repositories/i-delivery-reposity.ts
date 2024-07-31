import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IDelivery } from 'data/requests/delivery/delivery-request';
import { IUpdateDeliveryStatus } from 'data/requests/delivery/update-delivery-status-request';
import { ListDeliveryResponse } from 'data/responses/delivery/delivery-response';
import { DetailDeliveryResponse } from 'data/responses/delivery/detail-delivery-response';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class IDeliveryRepository {
	abstract getDeliveries(params: RequestParams): Observable<ListDeliveryResponse>;

	abstract addDelivery(params: IDelivery): Observable<any>;

	abstract updateDelivery(params: IDelivery): Observable<any>;

	abstract detailDelivery(params: ParamsID): Observable<DetailDeliveryResponse>;

	abstract updateDeliveryStatus(params: IUpdateDeliveryStatus): Observable<any>;
}
