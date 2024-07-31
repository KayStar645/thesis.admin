import { Component, signal } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsCategory } from 'config/breadcrumbs';
import { queryKey } from 'config/query-key';
import { RequestParams } from 'core/params/requestParams';
import { ICategory } from 'data/requests/category/category.request';
import { CategoryService } from 'domain/services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Subject, debounceTime, fromEvent, lastValueFrom, takeUntil } from 'rxjs';

@Component({
	selector: 'app-category-component',
	templateUrl: './category.component.html',
	providers: [],
})
export class CategoryComponent {
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;
	categoryId: number = -1;
	subject: Subject<string> = new Subject();
	currentPage = signal(1);
	keyword = signal('');

	buttons = [
		{
			svgContent: '../../../../../../assets/icons/plus_math.svg',
			valueButton: 'Tạo mới',
			valueClass:
				'border border-green-500 text-white bg-gradient-to-t from-green-500 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg  space-x-2 px-3 py-1 text-center me-2',
			buttonClicked: () => (this.categoryId = 0),
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/add.svg',
			valueButton: 'Nhập Excel',
			valueClass:
				'border border-yellow-500 text-amber-800 bg-gradient-to-t from-yellow-300 via-yellow-200 to-yellow-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-400  font-medium rounded-lg  space-x-2  px-3 py-1 text-center  me-2 mb-2',
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/microsoft_excel.svg',
			valueButton: 'Xuất Excel',
			valueClass:
				'border border-teal-500 text-green-800 bg-gradient-to-t from-teal-300 via-teal-200 to-teal-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-400  font-medium rounded-lg   space-x-2 px-3 py-1 text-center  me-2 mb-2',
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/export_pdf.svg',
			valueButton: 'Xuất PDF',
			valueClass:
				'border border-rose-500 text-rose-800 bg-gradient-to-t from-rose-300 via-rose-200 to-rose-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-rose-400  font-medium rounded-lg  space-x-2  px-3 py-1 text-center  me-2 mb-2',
			valueClassSvgContent: 'h-7 w-7',
		},
	];

	columns: {
		title: string;
		getter: (item: ICategory) => any;
		name?: string;
		class?: string;
	}[] = [
		{ title: 'Mã loại sản phẩm', getter: (item: ICategory) => item['internalCode'] },
		{ title: 'Tên loại sản phẩm', getter: (item: ICategory) => item['name'] },
		{ title: 'Nhóm cha', getter: (item: ICategory) => item['parent']?.name },
	];

	categoryQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.category.list({
			keyword: this.keyword(),
			page: this.currentPage(),
			pageSize: 10,
		}),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			const params: RequestParams = {
				filters: `(Name|InternalCode)@=${this.keyword()}`,
				sorts: '',
				page: this.currentPage(),
				pageSize: 10,
			};

			return lastValueFrom(this.categoryService.getCategory_pageparams(params).pipe(takeUntil(abort$)));
		},
	}));

	categoryDeleteMutate = injectMutation(() => ({
		mutationFn: (id: number) => {
			return lastValueFrom(this.categoryService.deleteCategory({ Id: id }));
		},
		onSuccess: (data) => {
			this.categoryQuery.refetch();

			this.toast.success('Xóa loại sản phẩm thành công');
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

	constructor(
		breadcrumbService: BreadcrumbService,
		private toast: ToastrService,
		private categoryService: CategoryService,
		private confirmationService: ConfirmationService,
	) {
		this.breadcrumbService = breadcrumbService;
	}

	ngOnInit() {
		this.breadcrumbs = breadcrumbsCategory;

		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);

		this.subject.pipe(debounceTime(500)).subscribe((value) => {
			this.keyword.set(value);

			this.categoryQuery.refetch();
		});
	}

	onChangeKeyword(event: Event) {
		const target = event.target as HTMLInputElement;

		this.subject.next(target.value);
	}

	handlePage(pageNumber: number) {
		this.currentPage.set(pageNumber);
	}

	handleRowAction(eventData: { action: string; data: ICategory; event: MouseEvent }) {
		if (eventData.action === 'update') {
			this.categoryId = eventData.data.id;
		}

		if (eventData.action === 'delete') {
			this.confirmationService.confirm({
				target: eventData.event.target as EventTarget,
				message: 'Bạn có chắc muốn xóa loại sản phẩm này',
				header: 'Thông báo',
				icon: 'pi pi-exclamation-triangle',
				acceptLabel: 'Đồng ý',
				rejectLabel: 'Hủy',
				acceptButtonStyleClass:
					'px-3 py-2 bg-green-500 hover:bg-green-600 cursor-pointer rounded-md text-white ml-3',
				rejectButtonStyleClass: 'px-3 py-2 bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-md text-white',
				accept: () => {
					this.categoryDeleteMutate.mutate(eventData.data.id);
				},
				reject: () => {},
			});
		}
	}
}
