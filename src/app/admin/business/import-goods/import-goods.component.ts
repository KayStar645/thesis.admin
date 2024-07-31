import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsImportGoods } from 'config/breadcrumbs';
import { queryKey } from 'config/query-key';
import { statusPromotion, statusSupplierOrder } from 'config/status';
import { RequestParams } from 'core/params/requestParams';
import { IImportGoods } from 'data/requests/import-goods/import-goods-request';
import { format } from 'date-fns';
import { ImportGoodsService } from 'domain/services/import-goods/import-goods-service';
import { sortBy } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, fromEvent, lastValueFrom, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-import-goods',
	templateUrl: './import-goods.component.html',
	styles: ``,
	providers: [],
})
export class ImportGoodsComponent {
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;
	keyword = signal('');
	debounce: Subject<string> = new Subject();

	currentPage = signal(1);

	columns: {
		title: string;
		getter: (item: IImportGoods) => any;
		name?: string;
		class?: string;
	}[] = [
		{ title: 'Mã đơn nhập', getter: (item: IImportGoods) => item['internalCode'] },
		{ title: 'Nhân viên tạo', getter: (item: IImportGoods) => item['approveStaff'].name },
		{ title: 'Nhà cung cấp', getter: (item: IImportGoods) => item['distributor'].name },
		{
			title: 'Ngày nhập',
			getter: (item: IImportGoods) => format(item['bookingDate'], 'dd/MM/yyyy'),
			class: 'text-center',
		},
		// {
		// 	title: 'Trạng thái',
		// 	getter: (item: IImportGoods) => statusSupplierOrder[item.status]?.label,
		// 	class: 'text-center',
		// },
		{
			title: 'Tổng tiền',
			getter: (item: IImportGoods) => item['total'].toLocaleString('vi-VN') + 'đ',
			class: 'text-right',
		},
	];

	importGoodsQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.importGoods.list({
			keyword: this.keyword(),
			page: this.currentPage(),
			pageSize: 10,
		}),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			const params: RequestParams = {
				filters: `(Name|InternalCode)@=${this.keyword()}`,
				sorts: '-bookingDate',
				page: this.currentPage(),
				pageSize: 10,
			};

			return lastValueFrom(this.importGoodsService.getImportGoods(params).pipe(takeUntil(abort$)));
		},
	}));

	importGoodsDeleteMutate = injectMutation(() => ({
		mutationFn: (id: number) => {
			return lastValueFrom(this.importGoodsService.deleteImportGoods({ Id: id }));
		},
		onSuccess: (data) => {
			this.importGoodsQuery.refetch();

			this.toast.success('Xóa sản phẩm thành công');
		},
		onError: (err) => {
			this.toast.error(err.message);
		},
		retry: (failureCount, error: any) => {
			if (error.status === 403) {
				this.toast.error('Lỗi chưa cấp quyền');

				return false;
			}
			return failureCount < 3;
		},
	}));

	buttons = [
		{
			svgContent: '../../../../../../assets/icons/plus_math.svg',
			valueButton: 'Tạo mới',
			valueClass:
				'border border-green-500 text-white bg-gradient-to-t from-green-500 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg  space-x-2 px-3 py-1 text-center me-2',
			buttonClicked: () => {
				this.router.navigate(['admin/business/import-goods/form'], {
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
		private importGoodsService: ImportGoodsService,
		breadcrumbService: BreadcrumbService,
		private router: Router,
		private toast: ToastrService,
	) {
		this.breadcrumbs = breadcrumbsImportGoods;
		this.breadcrumbService = breadcrumbService;
		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
	}

	ngOnInit() {
		this.debounce.pipe(debounceTime(500)).subscribe((value) => {
			this.keyword.set(value);
		});
	}

	handleRowAction(eventData: { action: string; data: IImportGoods; event: MouseEvent }) {
		if (eventData.action === 'update') {
			this.router.navigate(['admin/business/import-goods/form'], {
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
}
