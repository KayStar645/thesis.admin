import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminSharedModule } from '../_modules/admin-shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfitComponent } from './profit/profit.component';
import { DashboardComponent } from './dashboard.component';
import { ProfitItemComponent } from './profit/profit-item/profit-item.component';
import { StatsDashboardComponent } from './stats-dashboard/stats-dashboard.component';
import { CardStatsComponent } from './stats-dashboard/card-stats/card-stats.component';
import { OrderStatsComponent } from './stats-dashboard/order-stats/order-stats.component';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StockStatsComponent } from './stats-dashboard/stock-stats/stock-stats.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { StatusOrderStatsComponent } from './stats-dashboard/status-order-stats/status-order-stats.component';
import { OrderDetailFormComponent } from './stats-dashboard/status-order-stats/order-detail-form/order-detail-form.component';
import { SellingStatsComponent } from './stats-dashboard/selling-stats/selling-stats.component';
import { MainComponent } from './main/main.component';
import { RevenueStatsComponent } from './stats-dashboard/revenue-stats/revenue-stats.component';
import { ReportComponent } from './report/report.component';
import { ReportPromotionComponent } from './report-promotion/report-promotion.component';

@NgModule({
	declarations: [
		DashboardComponent,
		ProfitComponent,
		StatsDashboardComponent,
		CardStatsComponent,
		OrderStatsComponent,
		StockStatsComponent,
		StatusOrderStatsComponent,
		OrderDetailFormComponent,
		SellingStatsComponent,
		MainComponent,
		RevenueStatsComponent,
		ProfitItemComponent,
  ReportComponent,
  ReportPromotionComponent,
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		AdminSharedModule,
		ChartModule,
		SelectButtonModule,
		HighchartsChartModule,
	],
})
export class DashboardModule {}
