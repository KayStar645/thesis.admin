import { DatePipe } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { AppFormService } from 'app/_components/form/app-form.service';
import { queryKey } from 'config/query-key';
import { statusProduct } from 'config/status';
import { ICategory } from 'data/requests/category/category.request';
import { IProduct } from 'data/requests/product/product.request';
import { ProductService } from 'domain/services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { array, number, object, string } from 'yup';

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styles: ``,
})
export class ProductFormComponent {
	id: WritableSignal<number> = signal(-1);
	status = statusProduct;

	formSchema = object({
		name: string().required(),
		internalCode: string().required(),
		price: number().required(),
		categoryId: number().required(),
		describes: string().required(),
		feature: string().required(),
		specifications: string().required(),
		images: array().of(string()).default([]).min(1),
	});

	detailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: [queryKey.product.detail(this.id())],
		enabled: this.id() != 0,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.productService.detailProduct({ Id: this.id() }).pipe(takeUntil(abort$)));
		},
	}));

	categoryColumns: {
		title: string;
		getter: (item: ICategory) => void;
		name?: string;
	}[] = [
		{ title: 'Mã loại sản phẩm', getter: (item: ICategory) => item['internalCode'] },
		{ title: 'Tên lại sản phẩm', getter: (item: ICategory) => item['name'] },
		{
			title: 'Loại sản phẩm cha',
			getter: (item: ICategory) => {
				return item?.['parent']?.['name'];
			},
		},
		{
			title: '',
			getter: (item: ICategory) => {
				return item?.['isChecked'];
			},
		},
	];

	addMutate = injectMutation(() => ({
		mutationFn: (data: IProduct) => {
			return lastValueFrom(this.productService.addProduct(data));
		},
		onSuccess: (data) => {
			this.toast.success('Thêm sản phẩm thành công');

			this.router.navigate(['admin/master-data/product']);
		},
		onError: (error: any) => {
			this.toast.error(error.error.messages[0] || error.message);
		},
		retry: (failureCount, error: any) => {
			if (error.status === 403) {
				this.toast.error('Lỗi chưa cấp quyền');

				return false;
			}
			return failureCount < 3;
		},
	}));

	updateMutate = injectMutation(() => ({
		mutationFn: (data: IProduct) => {
			return lastValueFrom(this.productService.updateProduct(data));
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật sản phẩm thành công');
			this.router.navigate(['admin/master-data/product']);
		},
		onError: (error: any) => {
			this.toast.error(error.error.messages[0] || error.message);
		},
		retry: (failureCount, error: any) => {
			if (error.status === 403) {
				this.toast.error('Lỗi chưa cấp quyền');

				return false;
			}
			return failureCount < 3;
		},
	}));

	updateStatusMutate = injectMutation(() => ({
		mutationFn: (data: IProduct) => {
			return lastValueFrom(
				this.productService.updateStatusProduct({
					productId: data.id,
					status: data.status,
				}),
			);
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật sản phẩm thành công');

			this.detailQuery.refetch();
		},
		onError: (error: any) => {
			this.toast.error(error.error.messages[0] || error.message);
		},
		retry: (failureCount, error: any) => {
			if (error.status === 403) {
				this.toast.error('Lỗi chưa cấp quyền');

				return false;
			}
			return failureCount < 3;
		},
	}));

	form = {} as IProduct;

	errors: WritableSignal<{ [key: string]: string }> = signal({});

	constructor(
		private productService: ProductService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private formService: AppFormService,
		private toast: ToastrService,
	) {
		this.activatedRoute.queryParams.subscribe({
			next: (value) => {
				this.id.set(value['id']);
				this.form.id = value['id'];
			},
		});
	}

	formatDate(date: string): string {
		const newDate = new Date(date);
		const datePipe = new DatePipe('en-US');
		return datePipe.transform(newDate, 'dd/MM/yyyy') || '';
	}

	async onSubmit(status: number = -1) {
		const result = await this.formService.validate<IProduct>(this.formSchema, this.form);

		if (result.message) {
			this.errors.set(result.message);
		}

		if (result.valid && result.data) {
			if (this.id() > 0) {
				if (status > -1) {
					this.updateStatusMutate.mutate({
						...result.data,
						status,
					});

					return;
				}

				this.updateMutate.mutate({
					...result.data,
				});

				return;
			}

			this.addMutate.mutate({
				...result.data,
			});
		}
	}
}
