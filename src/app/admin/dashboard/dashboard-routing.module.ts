import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfitComponent } from './profit/profit.component';
import { StatsDashboardComponent } from './stats-dashboard/stats-dashboard.component';
import { MainComponent } from './main/main.component';
import { ReportComponent } from './report/report.component';
import { ReportPromotionComponent } from './report-promotion/report-promotion.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'profit',
	},
	{
		path: 'profit',
		component: ProfitComponent,
	},
	{
		path: 'statistic',
		component: StatsDashboardComponent,
	},
	{
		path: 'main',
		component: MainComponent,
	},
	{
		path: 'report',
		component: ReportComponent,
	},
	{
		path: 'report-promotion',
		component: ReportPromotionComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
