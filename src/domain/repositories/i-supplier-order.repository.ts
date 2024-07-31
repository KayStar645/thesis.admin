import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from '../../core/params/requestParams';
import { ListProductResponse } from 'data/responses/product/products.reponses';
import { IProduct } from 'data/requests/product/product.request';
import { ICreateSupplierOrder } from 'data/requests/supplier-order/create.supplier-order.request';
import { ISupplierOrder } from 'data/requests/supplier-order/supplier-order.request';
import { IUpdateStatusSupplierOrder } from 'data/requests/supplier-order/update.status.supplier-order.request';
import { IUpdateSupplierOrder } from 'data/requests/supplier-order/update.supplier-order.request';
import { CreateSupplierOrderResponse } from 'data/responses/supplier-order/create.supplier-order.reponses';
import { DetailSupplierOrderResponse } from 'data/responses/supplier-order/detail.supplier-order.reponses';
import { ListSupplierOrderResponse } from 'data/responses/supplier-order/supplier-orders.reponses';
import { UpdateStatusSupplierOrderResponse } from 'data/responses/supplier-order/update.status.supplier-order.reponses';
import { UpdateSupplierOrderResponse } from 'data/responses/supplier-order/update.supplier-order.reponses';

@Injectable({ providedIn: 'root' })
export abstract class ISupplierOrderRepository {
	abstract getSupplierOrders(params: RequestParams): Observable<ListSupplierOrderResponse<ISupplierOrder>>;

	abstract addSupplierOrder(params: ICreateSupplierOrder): Observable<CreateSupplierOrderResponse<ISupplierOrder>>;

	abstract updateSupplierOrder(params: IUpdateSupplierOrder): Observable<UpdateSupplierOrderResponse<ISupplierOrder>>;

	abstract detailSupplierOrder(params: ParamsID): Observable<DetailSupplierOrderResponse<ISupplierOrder>>;

	abstract UpdateStatusSupplierOrder(
		params: IUpdateStatusSupplierOrder,
	): Observable<UpdateStatusSupplierOrderResponse>;

	abstract getProducts(params: ParamsID): Observable<ListProductResponse<IProduct>>;
}
