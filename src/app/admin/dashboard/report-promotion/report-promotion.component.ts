import { Component, ElementRef, viewChild } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Result } from 'core/types/types';
import { IReport, IReportPromotion } from 'data/requests/report/report-request';
import { environment } from 'environments/environment.development';
import _ from 'lodash';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsReport } from 'config/breadcrumbs';
import { exportPDF } from '../report/report';

@Component({
	selector: 'app-report-promotion',
	templateUrl: './report-promotion.component.html',
	styles: ``,
})
export class ReportPromotionComponent {
	inputFile = viewChild<ElementRef<HTMLDivElement>>('body');
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;
	util = 41000000;
	date = new Date();
	exportFile = false;

	constructor(private http: HttpClient, breadcrumbService: BreadcrumbService) {
		this.breadcrumbService = breadcrumbService;
	}

	query = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: ['list', 'report-promotion'],
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(
				this.http
					.get<Result<IReportPromotion>>(`${environment.api}/smw-api/report/promotion-group-profit`, {
						params: {
							// pMinUtil: this.util,
							pMonth: this.date.getMonth() + 1,
							pYear: this.date.getFullYear(),
						},
					})
					.pipe(takeUntil(abort$)),
			);
		},
	}));

	ngOnInit() {
		this.breadcrumbs = breadcrumbsReport;

		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
	}

	onChangeUtil(value: any) {
		this.util = parseInt(value);
	}

	onReport() {
		try {
			this.exportFile = true;

			exportPDF(this.inputFile()?.nativeElement, 'report.pdf', () => {
				setTimeout(() => {
					this.exportFile = false;
				}, 500);
			});
		} catch (error) {
			console.log(error);
		}
	}

	data() {
		const data = this.query.data()?.data?.rows;

		const result = data?.map((row) => ({
			...row,
			items: row.names.map((t, index) => (index === 0 ? { name: t, rowSpan: row.names.length } : { name: t })),
		}));

		return _.flatMap(result, (obj) =>
			obj.items.map((item) => ({
				...obj,
				item: item,
			})),
		);
	}
}
