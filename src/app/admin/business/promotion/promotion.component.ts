import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsPromotion } from 'config/breadcrumbs';
import { queryKey } from 'config/query-key';
import { statusPromotion } from 'config/status';
import { RequestParams } from 'core/params/requestParams';
import { IPromotion } from 'data/requests/promotion/promotion.request';
import { PromotionService } from 'domain/services/promotion/promotion.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, fromEvent, lastValueFrom, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-promotion-component',
	templateUrl: './promotion.component.html',
})
export class PromotionComponent implements OnInit {
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;
	keyword = signal('');
	debounce: Subject<string> = new Subject();

	currentPage = signal(1);

	columns: {
		title: string;
		getter: (item: IPromotion) => any;
		name?: string;
		class?: string;
	}[] = [
		{ title: 'Mã CTKM', getter: (item: IPromotion) => item['internalCode'] },
		{ title: 'Tên CTKM', getter: (item: IPromotion) => item['name'] },
		{ title: 'Trạng thái', getter: (item: IPromotion) => statusPromotion[item.status || 0].name },
	];

	promotionQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.promotion.list({
			keyword: this.keyword(),
			page: this.currentPage(),
			pageSize: 10,
		}),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, '$abort');

			const params: RequestParams = {
				filters: this.keyword() != '' ? `${this.keyword()}` : `name@=${this.keyword()}`,
				sorts: '-id',
				page: this.currentPage(),
				pageSize: 10,
			};
			console.log(params);

			return lastValueFrom(this.promotionService.getPromotion_pageparams(params).pipe(takeUntil(abort$)));
		},
	}));

	buttons = [
		{
			svgContent: '../../../../../../assets/icons/plus_math.svg',
			valueButton: 'Tạo mới',
			valueClass:
				'border border-green-500 text-white bg-gradient-to-t from-green-500 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg  space-x-2 px-3 py-1 text-center me-2',
			buttonClicked: () => {
				this.router.navigate(['admin/business/promotion/form'], {
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
		private promotionService: PromotionService,
		breadcrumbService: BreadcrumbService,
		private router: Router,
		private toast: ToastrService,
	) {
		this.statuses.push({ name: 'Tất cả', id: 10 });

		this.breadcrumbs = breadcrumbsPromotion;
		this.breadcrumbService = breadcrumbService;
		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
	}

	ngOnInit() {
		this.debounce.pipe(debounceTime(500)).subscribe((value) => {
			this.keyword.set(value);
		});
	}

	handleRowAction(eventData: { action: string; data: IPromotion; event: MouseEvent }) {
		if (eventData.action === 'update') {
			this.router.navigate(['admin/business/promotion/form'], {
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
	statuses = statusPromotion;

	id: string = '1';
	showDropdown: boolean = false;
	toggleDropdown() {
		this.showDropdown = !this.showDropdown;
	}
	load() {
		console.log(this.id);

		if (this.id == '10' || this.id == null) {
			this.debounce.next('');
			return;
		} else {
			const filterCriteria: string = 'status==' + this.id;
			console.log(filterCriteria);
			this.debounce.next(filterCriteria);
		}
	}
}
