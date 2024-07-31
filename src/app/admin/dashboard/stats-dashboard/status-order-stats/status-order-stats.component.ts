import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { queryKey } from 'config/query-key';
import { statusOrder } from 'config/status';
import { RequestParams } from 'core/params/requestParams';
import { IOrder } from 'data/requests/order/order-request';
import { OrderService } from 'domain/services/order/order-service';
import { debounceTime, fromEvent, lastValueFrom, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-status-order-stats',
	templateUrl: './status-order-stats.component.html',
	styles: ``,
})
export class StatusOrderStatsComponent implements OnInit {
	products: IOrder[] = [];
	statuses = statusOrder;
	selectedStatus: any;
	keyword = signal('');
	debounce: Subject<string> = new Subject();
	currentPage = signal(1);

	constructor(private orderService: OrderService) {
		this.debounce.pipe(debounceTime(500)).subscribe((value) => {
			this.keyword.set(value);
		});
		this.loadProducts;
	}

	ngOnInit() {
		this.statuses.push({ label: 'Tất cả', id: 10 });
	}

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
				filters: this.keyword(),
				sorts: '-date',
				page: this.currentPage(),
				pageSize: 5,
			};
			console.log(params);

			return lastValueFrom(this.orderService.getOrder(params).pipe(takeUntil(abort$)));
		},
	}));
	id: string = '1';

	loadProducts() {
		if (this.id == '10' || this.id == null) {
			this.debounce.next('');
			return;
		}
		const filterCriteria: string = 'status==' + this.id;
		console.log(filterCriteria);
		this.debounce.next(filterCriteria);
	}

	getStatusLabel(statusId: number): string {
		const status = this.statuses.find((s) => s.id === statusId);
		return status ? status.label : 'Không xác định';
	}

	getStatusClass(statusId: number): string {
		const baseClasses = 'text-xs font-semibold';
		switch (statusId) {
			case 0:
				return `${baseClasses} text-gray-800 bg-gray-200`; // Trong giỏ hàng
			case 1:
				return `${baseClasses} text-blue-800 bg-blue-200`; // Đặt hàng
			case 2:
				return `${baseClasses} text-yellow-800 bg-yellow-200`; // Duyệt
			case 3:
				return `${baseClasses} text-indigo-800 bg-indigo-200`; // Vận chuyển
			case 4:
				return `${baseClasses} text-green-800 bg-green-200`; // Đã nhận
			case 5:
				return `${baseClasses} text-red-800 bg-red-200`; // Hủy
			default:
				return `${baseClasses} text-gray-800 bg-gray-200`;
		}
	}

	visible: boolean = false;
	code: number = 0;
	onDialogClose() {
		this.visible = false;
	}
	showOrderDetail(id: number) {
		this.code = id;
		this.visible = true;
	}
}
