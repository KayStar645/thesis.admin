import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsSupplierOrder } from 'config/breadcrumbs';
import { queryKey } from 'config/query-key';
import { statusSupplierOrder } from 'config/status';
import { RequestParams } from 'core/params/requestParams';
import { ISupplierOrder } from 'data/requests/supplier-order/supplier-order.request';
import { format } from 'date-fns';
import { SupplierOrderService } from 'domain/services/supplier-order/supplier-order.service';
import { debounceTime, fromEvent, lastValueFrom, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-supplier-order-component',
	templateUrl: './supplier-order.component.html',
	providers: [],
})
export class SupplierOrderComponent {
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;
	keyword = signal('');
	debounce: Subject<string> = new Subject();
	statuses = statusSupplierOrder;
	isFilter = false;

	currentPage = signal(1);

	columns: {
		title: string;
		getter: (item: ISupplierOrder) => any;
		name?: string;
		class?: string;
	}[] = [
		{ title: 'Mã đơn nhập', getter: (item: ISupplierOrder) => item['internalCode'] },
		{ title: 'Nhân viên tạo', getter: (item: ISupplierOrder) => item['approveStaff']?.name },
		{ title: 'Nhà cung cấp', getter: (item: ISupplierOrder) => item['distributor']?.name },
		{
			title: 'Ngày nhập',
			getter: (item: ISupplierOrder) => format(item['bookingDate'], 'dd/MM/yyyy'),
			class: 'text-center',
		},
		{
			title: 'Trạng thái',
			getter: (item: ISupplierOrder) => statusSupplierOrder[item.status]?.label,
			class: 'text-center',
		},
		{
			title: 'Tổng tiền',
			getter: (item: ISupplierOrder) => item['total'].toLocaleString('vi-VN') + 'đ',
			class: 'text-right',
		},
	];

	supplierOrderQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.supplierOrder.list({
			keyword: this.keyword(),
			page: this.currentPage(),
			pageSize: 10,
		}),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			const params: RequestParams = {
				filters: this.isFilter ? `status==${this.id}` : `internalCode@=${this.keyword()}`,
				sorts: '-bookingdate',
				page: this.currentPage(),
				pageSize: 10,
				isAllDetail: true,
			};

			return lastValueFrom(this.supplierOrderService.getSupplierOrder(params).pipe(takeUntil(abort$)));
		},
	}));

	buttons = [
		{
			svgContent: '../../../../../../assets/icons/plus_math.svg',
			valueButton: 'Tạo mới',
			valueClass:
				'border border-green-500 text-white bg-gradient-to-t from-green-500 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg  space-x-2 px-3 py-1 text-center me-2',
			buttonClicked: () => {
				this.router.navigate(['admin/business/supplier-order/form'], {
					queryParams: {
						id: 0,
					},
				});
			},
			valueClassSvgContent: 'h-7 w-7',
		},
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
		private supplierOrderService: SupplierOrderService,
		private router: Router,
	) {
		this.breadcrumbs = breadcrumbsSupplierOrder;
		this.breadcrumbService = breadcrumbService;
		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
	}

	ngOnInit() {
		this.statuses.push({ label: 'Tất cả', id: 10, describes: 'All' });

		this.debounce.pipe(debounceTime(500)).subscribe((value) => {
			this.keyword.set(value);
		});
	}

	handleRowAction(eventData: { action: string; data: ISupplierOrder; event: MouseEvent }) {
		if (eventData.action === 'update') {
			this.router.navigate(['admin/business/supplier-order/form'], {
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

	id: string = '1';
	showDropdown: boolean = false;
	toggleDropdown() {
		this.showDropdown = !this.showDropdown;
	}
	load() {
		console.log(this.id);

		if (this.id == '10' || this.id == null) {
			this.isFilter = false;
			this.supplierOrderQuery.refetch();
			return;
		} else {
			this.isFilter = true;
			this.supplierOrderQuery.refetch();
		}
	}
}
