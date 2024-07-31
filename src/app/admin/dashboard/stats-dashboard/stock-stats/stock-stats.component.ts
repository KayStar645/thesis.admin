import { Component, OnInit, signal, computed } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { queryKey } from 'config/query-key';
import { RequestParams } from 'core/params/requestParams';
import { IStatsInventory } from 'data/responses/stats/stats.reponses';
import { StatsService } from 'domain/services/stats/stats.service';
import * as Highcharts from 'highcharts';
import Sunburst from 'highcharts/modules/sunburst';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';

Sunburst(Highcharts);

interface ChartData {
	id: string;
	parent: string;
	name: string;
	value?: number;
}

@Component({
	selector: 'app-stock-stats',
	templateUrl: './stock-stats.component.html',
	styles: '',
})
export class StockStatsComponent implements OnInit {
	Highcharts: typeof Highcharts = Highcharts;
	currentPage = signal(1);
	keyword = signal('');

	constructor(private statsService: StatsService) {}

	inventoryQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.statsInventory.list({
			keyword: this.keyword(),
			page: this.currentPage(),
			pageSize: 50,
		}),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.statsService.getInventory().pipe(takeUntil(abort$)));
		},
	}));

	chartOptions = computed(() => {
		const data = this.inventoryQuery.data()?.data || [];
		console.log(data);

		return {
			chart: {
				type: 'sunburst',
				height: '100%',
			},
			title: {
				text: '',
			},
			plotOptions: {
				series: {
					states: {
						hover: {
							enabled: true,
						},
					},
				},
			},
			series: [
				{
					type: 'sunburst',
					data: data,
					cursor: 'pointer',
					dataLabels: {
						format: '{point.name}',
						filter: {
							property: 'innerArcLength',
							operator: '>',
							value: 16,
						},
					},
					levels: [
						{
							level: 1,
							dataLabels: {
								filter: {
									property: 'outerArcLength',
									operator: '>',
									value: 64,
								},
							},
						},
						{
							level: 2,
							colorByPoint: true,
						},
						{
							level: 3,
							colorVariation: {
								key: 'brightness',
								to: -0.5,
							},
						},
						{
							level: 4,
							colorVariation: {
								key: 'brightness',
								to: 0.5,
							},
						},
					],
				},
			],
			tooltip: {
				headerFormat: '',
				pointFormat: 'Tồn kho của <b>{point.name}</b> là <b>{point.value}</b>',
			},
		} as Highcharts.Options;
	});

	ngOnInit() {}
}
