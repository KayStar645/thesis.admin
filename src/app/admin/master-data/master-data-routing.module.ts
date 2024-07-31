import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { DistributorComponent } from './distributor/distributor.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'category',
	},
	{
		path: 'category',
		component: CategoryComponent,
	},
	{
		path: 'product',
		component: ProductComponent,
	},
	{
		path: 'product/form',
		component: ProductFormComponent,
	},
	{
		path: 'payment-method',
		component: PaymentMethodComponent,
	},
	{
		path: 'distributor',
		component: DistributorComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MasterDataRoutingModule {}
