import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, signal, WritableSignal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { api } from 'config/api';
import { queryKey } from 'config/query-key';
import { statusProduct } from 'config/status';
import { RequestParams } from 'core/params/requestParams';
import { ExtraList, ResultList } from 'core/types/types';
import { ICustomer } from 'data/requests/customer/customer.request';
import { IProduct } from 'data/requests/product/product.request';
import { ProductService } from 'domain/services/product/product.service';
import { StatsService } from 'domain/services/stats/stats.service';
import { environment } from 'environments/environment.development';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
type Response = ResultList<any> & {
	extra: ExtraList;
};
@Component({
	selector: 'app-card-stats',
	templateUrl: './card-stats.component.html',
	styles: ``,
})
export class CardStatsComponent {
	util = signal(1);
	value = 1;

	statsQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.staff.list(),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.statsService.getOverview().pipe(takeUntil(abort$)));
		},
	}));
	constructor(private statsService: StatsService, private productService: ProductService) {}

	productPopupColumns: {
		title: string;
		getter: (item: IProduct) => any;
	}[] = [
		{ title: 'Mã sản phẩm', getter: (item: IProduct) => item['internalCode'] },
		{ title: 'Tên sản phẩm', getter: (item: IProduct) => item['name'] },
		{
			title: 'Danh mục',
			getter: (item: IProduct) => (item['category'] == null ? '' : item['category']['name']),
		},
		{
			title: 'Giá',
			getter: (item: IProduct) => {
				return item['price']?.toLocaleString('vi-VN').concat('đ');
			},
		},
		{
			title: 'Tồn kho',
			getter: (item: IProduct) => item['quantity'],
		},
	];
	customerColumns: { title: string; getter: (item: ICustomer) => any }[] = [
		{
			title: 'Họ và tên',
			getter: (item: ICustomer) => item['name'],
		},
		{
			title: 'SĐT',
			getter: (item: ICustomer) => item['phone'],
		},
		{
			title: 'Email',
			getter: (item: ICustomer) => item['email'],
		},
		{
			title: 'Địa chỉ',
			getter: (item: ICustomer) => item['address'],
		},
		{
			title: 'Giới tính',
			getter: (item: ICustomer) => item['gender'],
		},
	];
	visibleOutOfStock: boolean = false;
	visibleProduct: boolean = false;
	visibleCustomer: boolean = false;

	toggleOutOfStockDialog() {
		this.visibleOutOfStock = true;
	}
	toggleProductDialog() {
		this.visibleProduct = true;
	}
	toggleCustomerDialog() {
		this.visibleCustomer = true;
	}
	onDialogClose() {
		this.visibleOutOfStock = false;
		this.visibleProduct = false;
		this.visibleCustomer = false;
	}
}
