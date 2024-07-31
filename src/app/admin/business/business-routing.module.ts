import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponFormComponent } from './coupon/coupon-form/coupon-form.component';
import { CouponComponent } from './coupon/coupon.component';
import { CustomerComponent } from './customer/customer.component';
import { ImportGoodsFormComponent } from './import-goods/import-goods-form/import-goods-form.component';
import { ImportGoodsComponent } from './import-goods/import-goods.component';
import { PromotionFormComponent } from './promotion/promotion-form/promotion-form.component';
import { PromotionComponent } from './promotion/promotion.component';
import { SupplierOrderFormComponent } from './supplier-order/supplier-order-form/supplier-order-form.component';
import { SupplierOrderComponent } from './supplier-order/supplier-order.component';
import { OrderFormComponent } from './order/order-form/order-form.component';
import { OrderComponent } from './order/order.component';
import { DeliveryComponent } from './delivery/delivery.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'supplier-order',
	},
	{
		path: 'supplier-order',
		component: SupplierOrderComponent,
	},
	{
		path: 'supplier-order/form',
		component: SupplierOrderFormComponent,
	},
	{
		path: 'promotion',
		component: PromotionComponent,
	},
	{
		path: 'promotion/form',
		component: PromotionFormComponent,
	},
	{
		path: 'customer',
		component: CustomerComponent,
	},
	{
		path: 'import-goods',
		component: ImportGoodsComponent,
	},
	{
		path: 'import-goods/form',
		component: ImportGoodsFormComponent,
	},
	{
		path: 'coupon',
		component: CouponComponent,
	},
	{
		path: 'coupon/form',
		component: CouponFormComponent,
	},
	{
		path: 'order',
		component: OrderComponent,
	},
	{
		path: 'order/form',
		component: OrderFormComponent,
	},
	{
		path: 'delivery',
		component: DeliveryComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BusinessRoutingModule {}
