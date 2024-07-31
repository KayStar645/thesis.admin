import { Injectable } from '@angular/core';
import { SupplierOrderRepository } from 'data/datasources/remote/repo-implementations/supplier-order/supplier-order.repository';
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
import { Observable } from 'rxjs'; // Import of từ rxjs
import { ParamsID } from '../../../core/params/paramID';
import { RequestParams } from 'core/params/requestParams';

@Injectable({
	providedIn: 'root',
})
export class SupplierOrderService {
	constructor(private supplierOrderRepository: SupplierOrderRepository) {}

	getSupplierOrder(params: RequestParams): Observable<ListSupplierOrderResponse<ISupplierOrder>> {
		return this.supplierOrderRepository.getSupplierOrders(params);
	}

	detailSupplierOrder(param: ParamsID): Observable<DetailSupplierOrderResponse<ISupplierOrder>> {
		return this.supplierOrderRepository.detailSupplierOrder(param);
	}
	updateSupplierOrder(param: IUpdateSupplierOrder): Observable<UpdateSupplierOrderResponse<ISupplierOrder>> {
		return this.supplierOrderRepository.updateSupplierOrder(param);
	}

	//Thêm phiếu nhập hàng
	addSupplierOrder(param: ICreateSupplierOrder): Observable<CreateSupplierOrderResponse<ISupplierOrder>> {
		return this.supplierOrderRepository.addSupplierOrder(param);
	}
	//Cập nhật trạng thái phiếu nhập hàng
	updateStatusSupplierOrder(param: IUpdateStatusSupplierOrder): Observable<UpdateStatusSupplierOrderResponse> {
		return this.supplierOrderRepository.UpdateStatusSupplierOrder(param);
	}

	getProducts(param: ParamsID): Observable<ListProductResponse<IProduct>> {
		return this.supplierOrderRepository.getProducts(param);
	}
}
