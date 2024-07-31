import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsCoupon } from 'config/breadcrumbs';
import { queryKey } from 'config/query-key';
import { statusCoupon } from 'config/status';
import { RequestParams } from 'core/params/requestParams';
import { ICoupon } from 'data/requests/coupon/coupon-request';
import { CouponService } from 'domain/services/coupon/coupon-service';
import { debounceTime, fromEvent, lastValueFrom, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-coupon',
	templateUrl: './coupon.component.html',
	styles: ``,
})
export class CouponComponent implements OnInit {
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;
	keyword = signal('');
	debounce: Subject<string> = new Subject();

	currentPage = signal(1);

	columns: {
		title: string;
		getter: (item: ICoupon) => any;
		name?: string;
		class?: string;
	}[] = [
		{ title: 'Mã giảm giá', getter: (item: ICoupon) => item['internalCode'] },
		{ title: 'Tên giảm giá', getter: (item: ICoupon) => item['name'] },
		{ title: 'Trạng thái', getter: (item: ICoupon) => statusCoupon[item.status || 0].label },
	];

	couponQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.coupon.list({
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

			return lastValueFrom(this.couponService.getCoupon_pageparams(params).pipe(takeUntil(abort$)));
		},
	}));

	buttons = [
		{
			svgContent: '../../../../../../assets/icons/plus_math.svg',
			valueButton: 'Tạo mới',
			valueClass:
				'border border-green-500 text-white bg-gradient-to-t from-green-500 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg  space-x-2 px-3 py-1 text-center me-2',
			buttonClicked: () => {
				this.router.navigate(['admin/business/coupon/form'], {
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

	constructor(private couponService: CouponService, breadcrumbService: BreadcrumbService, private router: Router) {
		this.breadcrumbs = breadcrumbsCoupon;
		this.breadcrumbService = breadcrumbService;
		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
	}

	ngOnInit() {
		this.debounce.pipe(debounceTime(500)).subscribe((value) => {
			this.keyword.set(value);
		});
	}

	handleRowAction(eventData: { action: string; data: ICoupon; event: MouseEvent }) {
		if (eventData.action === 'update') {
			this.router.navigate(['admin/business/coupon/form'], {
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
