import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { statusProduct } from 'config/status';
import { IProduct } from 'data/requests/product/product.request';
import { PromotionForProduct } from 'data/requests/promotion/detail.promotion.request';

@Component({
	selector: 'app-apply-product-to-promotion',
	templateUrl: './apply-product-to-promotion.component.html',
	styles: ``,
})
export class ApplyProductToPromotionComponent implements OnChanges {
	@Input() data: PromotionForProduct[] = [];

	@Output() onChange = new EventEmitter<PromotionForProduct[]>();

	index = 0;

	productColumns: {
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
				return item['price']?.toLocaleString('vi-VN');
			},
		},
		{
			title: 'Tồn kho',
			class: 'text-right',
			getter: (item: IProduct) => item['quantity'],
		},
	];

	productColumns2: {
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
				return item['price']?.toLocaleString('vi-VN');
			},
		},
		{
			title: 'Tồn kho',
			class: 'text-right',
			getter: (item: IProduct) => item['quantity'],
		},
		{
			title: '',
			class: 'text-right',
			getter: (item: IProduct) => item['isChecked'],
		},
	];

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['data'] && changes['data'].currentValue) {
			const value = changes['data'].currentValue as any[];

			this.index = 0;
			this.data = [];

			value.forEach((item) => {
				this.data.push({
					...item,
					index: this.index,
				});

				this.index += 1;
			});

			this.onChange.emit(this.data);
		}
	}

	onAddGroup() {
		this.data.push({
			group: -1,
			groupProducts: [],
			index: this.index,
		});

		this.index += 1;
	}

	onUpdateGroup(event: number[], index: number) {
		this.data[index].groupProducts = event;

		this.onChange.emit(this.data);
	}
}
