import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminSharedModule } from '../_modules/admin-shared.module';
import { CategoryComponent } from './category/category.component';
import { DistributorModalComponent } from './distributor/distributor-modal/distributor-modal.component';
import { DistributorComponent } from './distributor/distributor.component';
import { MasterDataRoutingModule } from './master-data-routing.module';
import { MasterDataComponent } from './master-data.component';
import { PaymentMethodModalComponent } from './payment-method/payment-method-modal/payment-method-modal.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductComponent } from './product/product.component';
import { CategoryModalComponent } from './category/category-modal/category-modal.component';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
	declarations: [
		MasterDataComponent,

		ProductComponent,
		ProductFormComponent,

		DistributorComponent,
		DistributorModalComponent,

		CategoryComponent,
		CategoryModalComponent,

		PaymentMethodComponent,
		PaymentMethodModalComponent,
	],
	imports: [CommonModule, MasterDataRoutingModule, AdminSharedModule, SelectButtonModule],
})
export class MasterDataModule {}
