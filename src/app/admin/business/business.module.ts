import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminSharedModule } from '../_modules/admin-shared.module';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessComponent } from './business.component';
import { CustomerComponent } from './customer/customer.component';
import { UpdateCustomerModalComponent } from './customer/update.customer.modal/update.customer.modal';
import { ImportGoodsFormComponent } from './import-goods/import-goods-form/import-goods-form.component';
import { ImportGoodsComponent } from './import-goods/import-goods.component';
import { ApplyProductToPromotionComponent } from './promotion/apply-product-to-promotion/apply-product-to-promotion.component';
import { PromotionFormComponent } from './promotion/promotion-form/promotion-form.component';
import { PromotionComponent } from './promotion/promotion.component';
import { SupplierOrderFormComponent } from './supplier-order/supplier-order-form/supplier-order-form.component';
import { SupplierOrderComponent } from './supplier-order/supplier-order.component';
import { CouponComponent } from './coupon/coupon.component';
import { CouponFormComponent } from './coupon/coupon-form/coupon-form.component';
import { OrderComponent } from './order/order.component';
import { OrderFormComponent } from './order/order-form/order-form.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryModalComponent } from './delivery/delivery-modal/delivery-modal.component';
import { FilterModalComponent } from './order/filter-modal/filter-modal.component';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
	declarations: [
		BusinessComponent,

		SupplierOrderComponent,
		SupplierOrderFormComponent,

		PromotionComponent,
		PromotionFormComponent,
		ApplyProductToPromotionComponent,

		CustomerComponent,
		UpdateCustomerModalComponent,

		ImportGoodsComponent,
		ImportGoodsFormComponent,

		CouponComponent,
		CouponFormComponent,

		OrderComponent,
		OrderFormComponent,

		DeliveryComponent,
		DeliveryModalComponent,
		FilterModalComponent,
	],
	imports: [CommonModule, SelectButtonModule, BusinessRoutingModule, AdminSharedModule, CalendarModule],
	exports: [],
})
export class BusinessModule {}
