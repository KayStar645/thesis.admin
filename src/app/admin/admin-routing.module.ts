import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: 'master-data',
				loadChildren: () => import('./master-data/master-data.module').then((m) => m.MasterDataModule),
			},
			{
				path: 'business',
				loadChildren: () => import('./business/business.module').then((m) => m.BusinessModule),
			},
			{
				path: 'system',
				loadChildren: () => import('./system/system.module').then((m) => m.SystemModule),
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
