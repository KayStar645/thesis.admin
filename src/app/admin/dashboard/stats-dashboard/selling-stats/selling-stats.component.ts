import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IStatsOrderParams } from 'data/requests/stats/stats.request';
import { IStatsSelling } from 'data/responses/stats/stats.reponses';
import { StatsService } from 'domain/services/stats/stats.service';
import { lastValueFrom } from 'rxjs';

@Component({
	selector: 'app-selling-stats',
	templateUrl: './selling-stats.component.html',
	styles: ``,
})
export class SellingStatsComponent implements OnInit {
	formGroup: FormGroup;
	basicData: any;
	basicOptions: any;
	stateOptions: any[] = [
		{ label: 'Năm', value: 'year' },
		{ label: 'Tháng', value: 'month' },
	];
	value: string = 'year';
	years: any[] = [];
	months: any[] = [];
	showYearDropdown: boolean = true;
	showMonthDropdown: boolean = false;

	constructor(private fb: FormBuilder, private statsService: StatsService) {
		const currentYear = new Date().getFullYear();
		const currentMonth = new Date().getMonth() + 1;
		this.formGroup = this.fb.group({
			selectedYear: [currentYear],
			selectedMonth: [currentMonth],
		});
	}

	ngOnInit() {
		this.populateYears();
		this.populateMonths();
		this.initChartOptions();
		this.onTimePeriodChange();
	}

	initChartOptions() {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue('--text-color');
		const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
		const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

		this.basicOptions = {
			maintainAspectRatio: false,
			aspectRatio: 0.6,
			plugins: {
				legend: {
					labels: {
						color: textColor,
					},
				},
				tooltip: {
					callbacks: {
						title: (tooltipItems: any) => {
							return this.basicData.labels[tooltipItems[0].dataIndex];
						},
					},
				},
			},
			scales: {
				x: {
					display: false,
					grid: {
						color: surfaceBorder,
					},
				},
				y: {
					ticks: {
						color: textColorSecondary,
					},
					grid: {
						color: surfaceBorder,
					},
				},
			},
		};
	}

	populateYears() {
		const currentYear = new Date().getFullYear();
		for (let year = currentYear; year >= 1950; year--) {
			this.years.push({ label: year.toString(), value: year });
		}
	}

	populateMonths() {
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		for (let i = 0; i < 12; i++) {
			this.months.push({ label: monthNames[i], value: i + 1 });
		}
	}

	onTimePeriodChange() {
		this.showYearDropdown = this.value === 'year';
		this.showMonthDropdown = this.value === 'month';
		this.updateChart();
	}

	onYearChange() {
		this.updateChart();
	}

	onMonthChange() {
		this.updateChart();
	}

	async updateChart() {
		const param: IStatsOrderParams = {
			isYear: this.value === 'year',
			year: this.formGroup.get('selectedYear')?.value,
			month: this.value === 'month' ? this.formGroup.get('selectedMonth')?.value : 1,
		};

		try {
			const success = await lastValueFrom(this.statsService.getSelling(param));

			const data = success.data;
			if (!data) return;
			console.log(data);

			if (this.value === 'year') {
				this.updateChartForYear(data);
			} else {
				this.updateChartForMonth(data);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	updateChartForYear(data: IStatsSelling[]) {
		const labels = data.map((item) => item.name);
		const values = data.map((item) => item.value);

		const backgroundColors = [
			'rgba(75, 192, 192, 0.6)', // Jan
			'rgba(153, 102, 255, 0.6)', // Feb
			'rgba(255, 159, 64, 0.6)', // Mar
			'rgba(54, 162, 235, 0.6)', // Apr
			'rgba(255, 99, 132, 0.6)', // May
			'rgba(255, 205, 86, 0.6)', // Jun
			'rgba(75, 192, 192, 0.6)', // Jul
			'rgba(153, 102, 255, 0.6)', // Aug
			'rgba(255, 159, 64, 0.6)', // Sep
			'rgba(54, 162, 235, 0.6)', // Oct
			'rgba(255, 99, 132, 0.6)', // Nov
			'rgba(255, 205, 86, 0.6)', // Dec
		];

		const hoverBackgroundColors = [
			'rgba(75, 192, 192, 0.8)', // Jan
			'rgba(153, 102, 255, 0.8)', // Feb
			'rgba(255, 159, 64, 0.8)', // Mar
			'rgba(54, 162, 235, 0.8)', // Apr
			'rgba(255, 99, 132, 0.8)', // May
			'rgba(255, 205, 86, 0.8)', // Jun
			'rgba(75, 192, 192, 0.8)', // Jul
			'rgba(153, 102, 255, 0.8)', // Aug
			'rgba(255, 159, 64, 0.8)', // Sep
			'rgba(54, 162, 235, 0.8)', // Oct
			'rgba(255, 99, 132, 0.8)', // Nov
			'rgba(255, 205, 86, 0.8)', // Dec
		];

		this.basicData = {
			labels: labels,
			datasets: [
				{
					label: 'Số lượng đơn hàng',
					data: values,
					backgroundColor: backgroundColors,
					borderColor: 'rgb(75, 192, 192)',
					borderWidth: 2,
					fill: true,
					hoverBackgroundColor: hoverBackgroundColors,
					hoverBorderColor: 'rgb(75, 192, 192)',
				},
			],
		};
	}

	updateChartForMonth(data: IStatsSelling[]) {
		const daysInMonth = Math.max(...data.map((item) => item.value || 0));
		const labels = data.map((item) => item.name);
		const values = data.map((item) => item.value);

		const backgroundColors = new Array(daysInMonth).fill('').map(() => {
			return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
				Math.random() * 256,
			)}, 0.6)`;
		});

		const hoverBackgroundColors = new Array(daysInMonth).fill('').map(() => {
			return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
				Math.random() * 256,
			)}, 0.8)`;
		});

		this.basicData = {
			labels: labels,
			datasets: [
				{
					label: 'Số lượng đơn hàng',
					data: values,
					backgroundColor: backgroundColors,
					borderColor: 'rgb(75, 192, 192)',
					borderWidth: 1,
					fill: true,
					hoverBackgroundColor: hoverBackgroundColors,
					hoverBorderColor: 'rgb(75, 192, 192)',
				},
			],
		};
	}
}
