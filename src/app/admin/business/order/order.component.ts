import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsOrder } from 'config/breadcrumbs';
import { queryKey } from 'config/query-key';
import { statusOrder } from 'config/status';
import { RequestParams } from 'core/params/requestParams';
import { IOrder } from 'data/requests/order/order-request';
import { format } from 'date-fns';
import { OrderService } from 'domain/services/order/order-service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, fromEvent, lastValueFrom, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styles: ``,
})
export class OrderComponent implements OnInit {
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;
	keyword = signal('');
	debounce: Subject<string> = new Subject();

	currentPage = signal(1);

	columns: {
		title: string;
		getter: (item: IOrder) => any;
		name?: string;
		class?: string;
	}[] = [
		{ title: 'Mã đơn hàng', getter: (item: IOrder) => item['internalCode'] },
		{ title: 'Ngày tạo', getter: (item: IOrder) => format(item['date'], 'dd/MM/yyyy'), class: 'text-center' },
		{
			title: 'Tổng tiền',
			getter: (item: IOrder) => item['total'].toLocaleString('vi-VN').concat('đ'),
			class: 'text-right',
		},
		{ title: 'Trạng thái', getter: (item: IOrder) => statusOrder[item.status].label, class: 'text-center' },
		{ title: 'Khách hàng', getter: (item: IOrder) => item['customer'].name },
	];

	orderQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.order.list({
			keyword: this.keyword(),
			page: this.currentPage(),
			pageSize: 10,
		}),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			const params: RequestParams = {
				filters: this.keyword() != '' ? `${this.keyword()}` : `internalCode@=${this.keyword()}`,
				sorts: '-date',
				page: this.currentPage(),
				pageSize: 10,
			};
			console.log(params);

			return lastValueFrom(this.orderService.getOrder(params).pipe(takeUntil(abort$)));
		},
	}));

	buttons = [
		{
			svgContent: '../../../../../../assets/icons/add.svg',
			valueButton: 'Nhập Excel',
			valueClass:
				'border border-yellow-500 text-amber-800 bg-gradient-to-t from-yellow-300 via-yellow-200 to-yellow-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-400  font-medium rounded-lg  space-x-2  px-3 py-1 text-center  me-2',
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/microsoft_excel.svg',
			valueButton: 'Xuất Excel',
			valueClass:
				'border border-teal-500 text-green-800 bg-gradient-to-t from-teal-300 via-teal-200 to-teal-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-400  font-medium rounded-lg   space-x-2 px-3 py-1 text-center  me-2 ',
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/export_pdf.svg',
			valueButton: 'Xuất PDF',
			valueClass:
				'border border-rose-500 text-rose-800 bg-gradient-to-t from-rose-300 via-rose-200 to-rose-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-rose-400  font-medium rounded-lg  space-x-2  px-3 py-1 text-center  me-2',
			valueClassSvgContent: 'h-7 w-7',
		},
	];

	constructor(
		breadcrumbService: BreadcrumbService,
		private orderService: OrderService,
		private router: Router,
		private toast: ToastrService,
	) {
		this.breadcrumbs = breadcrumbsOrder;
		this.breadcrumbService = breadcrumbService;
		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
	}

	ngOnInit() {
		this.debounce.pipe(debounceTime(500)).subscribe((value) => {
			this.keyword.set(value);
		});
	}

	handleRowAction(eventData: { action: string; data: IOrder; event: MouseEvent }) {
		if (eventData.action === 'update') {
			this.router.navigate(['admin/business/order/form'], {
				queryParams: {
					id: eventData.data.id,
				},
			});
		}
	}

	onPageChange(pageNumber: number) {
		this.currentPage.set(pageNumber);
	}

	onChangeKeyword(event: Event) {
		const target = event.target as HTMLInputElement;

		this.debounce.next(target.value);
	}
	showFilterModal: boolean = false;

	onFilterApplied(filterCriteria: any) {
		this.debounce.next(filterCriteria);
	}
}
