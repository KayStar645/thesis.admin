import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsProduct } from 'config/breadcrumbs';
import { queryKey } from 'config/query-key';
import { statusProduct } from 'config/status';
import { RequestParams } from 'core/params/requestParams';
import { IProduct } from 'data/requests/product/product.request';
import { ProductService } from 'domain/services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, fromEvent, lastValueFrom, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-product-component',
	templateUrl: './product.component.html',
	providers: [],
})
export class ProductComponent implements OnInit {
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;
	keyword = signal('');
	debounce: Subject<string> = new Subject();
	isFilter = false;

	currentPage = signal(1);

	columns: {
		title: string;
		getter: (item: IProduct) => any;
		name?: string;
		class?: string;
	}[] = [
		{ title: 'Mã sản phẩm', getter: (item: IProduct) => item['internalCode'] },
		{ title: 'Tên sản phẩm', getter: (item: IProduct) => item['name'] },
		{
			title: 'Danh mục',
			getter: (item: IProduct) => (item['category'] == null ? '' : item['category']['name']),
		},
		{
			title: 'Trạng thái',
			class: 'text-center',
			getter: (item: IProduct) => {
				const statusName = statusProduct.find((s) => s.id === item['status'])?.label;
				return statusName;
			},
		},
		{
			title: 'Giá',
			class: 'text-right',
			getter: (item: IProduct) => {
				return item['price']?.toLocaleString('vi-VN') + 'đ';
			},
		},
		{
			title: 'Tồn kho',
			class: 'text-right',
			getter: (item: IProduct) => item['quantity'],
		},
	];

	productQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.product.list({
			keyword: this.keyword(),
			page: this.currentPage(),
			pageSize: 10,
		}),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			const params: RequestParams = {
				filters: this.isFilter ? `status==${this.id}` : `(internalCode|name)@=${this.keyword()}`,
				sorts: '',
				page: this.currentPage(),
				pageSize: 10,
			};

			return lastValueFrom(this.productService.getProduct(params).pipe(takeUntil(abort$)));
		},
	}));

	productDeleteMutate = injectMutation(() => ({
		mutationFn: (id: number) => {
			return lastValueFrom(this.productService.deleteProduct({ Id: id }));
		},
		onSuccess: (data) => {
			this.productQuery.refetch();

			this.toast.success('Xóa sản phẩm thành công');
		},
		onError: (err) => {
			this.toast.error(err.message);
		},
	}));

	buttons = [
		{
			svgContent: '../../../../../../assets/icons/plus_math.svg',
			valueButton: 'Tạo mới',
			valueClass:
				'border border-green-500 text-white bg-gradient-to-t from-green-500 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg  space-x-2 px-3 py-1 text-center me-2',
			buttonClicked: () => {
				this.router.navigate(['admin/master-data/product/form'], {
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
		private productService: ProductService,
		breadcrumbService: BreadcrumbService,
		private router: Router,
		private toast: ToastrService,
	) {
		this.statuses.push({ label: 'Tất cả', id: 10, describes: 'All' });

		this.breadcrumbs = breadcrumbsProduct;
		this.breadcrumbService = breadcrumbService;
		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
	}

	ngOnInit() {
		this.debounce.pipe(debounceTime(500)).subscribe((value) => {
			this.keyword.set(value);
		});
	}

	handleRowAction(eventData: { action: string; data: IProduct; event: MouseEvent }) {
		if (eventData.action === 'update') {
			this.router.navigate(['admin/master-data/product/form'], {
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

	statuses = statusProduct;

	id: string = '1';
	showDropdown: boolean = false;
	toggleDropdown() {
		this.showDropdown = !this.showDropdown;
	}
	load() {
		if (this.id == '10' || this.id == null) {
			this.isFilter = false;
			this.productQuery.refetch();
			return;
		} else {
			this.isFilter = true;
			this.productQuery.refetch();
		}
	}
}
