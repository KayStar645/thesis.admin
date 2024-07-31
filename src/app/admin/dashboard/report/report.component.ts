import { Component, ElementRef, viewChild } from '@angular/core';
import { exportPDF } from './report';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Result } from 'core/types/types';
import { IReport } from 'data/requests/report/report-request';
import { environment } from 'environments/environment.development';
import _ from 'lodash';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsReport } from 'config/breadcrumbs';

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styles: ``,
})
export class ReportComponent {
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
		queryKey: ['list', 'report'],
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(
				this.http
					.get<Result<IReport>>(`${environment.api}/smw-api/report/profit`, {
						params: {
							pMinUtil: this.util,
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
			items: row.items.map((t, index) => (index === 0 ? { ...t, rowSpan: row.items.length } : t)),
		}));

		return _.flatMap(result, (obj) =>
			obj.items.map((item) => ({
				id: obj.id,
				groupProfits: obj.groupProfits,
				item: item,
			})),
		);
	}
}
