import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsProfit } from 'config/breadcrumbs';
import { queryKey } from 'config/query-key';
import { IProfit } from 'data/requests/profit/profit-request';
import { ProfitService } from 'domain/services/profit/profit-service';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';

@Component({
	selector: 'app-profit',
	templateUrl: './profit.component.html',
	styles: ``,
})
export class ProfitComponent implements OnInit {
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;
	util = 41000000;
	date = new Date();
	selected: WritableSignal<IProfit | undefined> = signal(undefined);

	columns: {
		title: string;
		getter: (item: IProfit) => any;
		name?: string;
		class?: string;
	}[] = [
		{
			title: 'Thứ tự',
			getter: (item: IProfit) => item['id'],
		},
		{
			title: 'Lợi nhuận',
			getter: (item: IProfit) => item['profit'].toLocaleString('vi-VN') + 'đ',
		},
	];

	profitQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.profit.list({ util: this.util }),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(
				this.profitService
					.getProfit({
						pMinUtil: this.util,
						pMonth: this.date.getMonth() + 1,
						pYear: this.date.getFullYear(),
					})
					.pipe(takeUntil(abort$)),
			);
		},
	}));

	profitDetailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.profit.detail({ id: this.selected()?.id }),
		enabled: !!this.selected()?.id,
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.profitService.getProfitDetail(this.selected()?.id!).pipe(takeUntil(abort$)));
		},
	}));

	constructor(breadcrumbService: BreadcrumbService, private profitService: ProfitService) {
		this.breadcrumbService = breadcrumbService;
	}

	ngOnInit() {
		this.breadcrumbs = breadcrumbsProfit;

		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
	}

	onChangeUtil(value: any) {
		this.util = parseInt(value);
	}

	handleRowAction(eventData: { action: string; data: IProfit; event: MouseEvent }) {
		if (eventData.action === 'update') {
			this.selected.set(eventData.data);
		}
	}
}
