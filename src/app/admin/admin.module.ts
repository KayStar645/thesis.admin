import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminLayoutComponentModule } from './_components/layout/admin-layout-component.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { BusinessModule } from './business/business.module';
import { MasterDataModule } from './master-data/master-data.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
	declarations: [AdminComponent],
	imports: [
		CommonModule,
		AdminRoutingModule,
		MasterDataModule,
		BusinessModule,
		DashboardModule,
		AdminLayoutComponentModule,
	],
	exports: [],
	providers: [],
})
export class AdminModule {}
