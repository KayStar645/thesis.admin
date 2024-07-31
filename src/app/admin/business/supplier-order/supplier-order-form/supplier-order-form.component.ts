import { ChangeDetectorRef, Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { AppFormService } from 'app/_components/form/app-form.service';
import { queryKey } from 'config/query-key';
import { statusSupplierOrder } from 'config/status';
import { IDistributor } from 'data/requests/distributor/distributor.request';
import { IProduct } from 'data/requests/product/product.request';
import { ISupplierOrder } from 'data/requests/supplier-order/supplier-order.request';
import { format } from 'date-fns';
import { SupplierOrderService } from 'domain/services/supplier-order/supplier-order.service';
import { ToastrService } from 'ngx-toastr';
import { count, fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { array, number, object, string } from 'yup';

@Component({
	selector: 'app-supplier-order-form',
	templateUrl: './supplier-order-form.component.html',
	styles: ``,
})
export class SupplierOrderFormComponent {
	id: WritableSignal<number> = signal(-1);
	status = statusSupplierOrder;
	errors: WritableSignal<{ [key: string]: string }> = signal({});
	selectedProducts: IProduct[] = [];
	totalPrice: number = 0;
	form: WritableSignal<ISupplierOrder> = signal({} as ISupplierOrder);

	formSchema = object({
		supplierOrderId: number().min(1),
		details: array().min(1),
	});

	detailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: [queryKey.supplierOrder.detail(this.id())],
		enabled: this.id() != 0,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(
				this.supplierOrderService.detailSupplierOrder({ Id: this.id() }).pipe(takeUntil(abort$)),
			);
		},
	}));

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
				return item['price']?.toLocaleString('vi-VN');
			},
		},
		{
			title: 'Tồn kho',
			getter: (item: IProduct) => item['quantity'],
		},
		{
			title: '',
			getter: (item: IProduct) => item['isChecked'],
		},
	];

	distributorColumns: { title: string; getter: (item: IDistributor) => any }[] = [
		{
			title: 'Mã nhà cung cấp',
			getter: (item: IDistributor) => item['internalCode'],
		},
		{
			title: 'Tên nhà cung cấp',
			getter: (item: IDistributor) => item['name'],
		},
		{
			title: 'Số điện thoại',
			getter: (item: IDistributor) => item['phone'],
		},
		{
			title: 'Email',
			getter: (item: IDistributor) => item['email'],
		},
		{
			title: '',
			getter: (item: IDistributor) => item['isChecked'],
		},
	];

	addMutate = injectMutation(() => ({
		mutationFn: (data: ISupplierOrder) => {
			return lastValueFrom(
				this.supplierOrderService.addSupplierOrder({
					details: data.details!,
					distributorId: data.distributorId,
				}),
			);
		},
		onSuccess: (data) => {
			this.toast.success('Thêm hóa đơn đặt thành công');

			this.router.navigate(['admin/business/supplier-order']);
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
		mutationFn: (data: ISupplierOrder) => {
			return lastValueFrom(
				this.supplierOrderService.updateSupplierOrder({
					id: data.id,
					details: data.details!,
					distributorId: data.distributorId,
				}),
			);
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật hóa đơn đặt thành công');
			this.router.navigate(['admin/business/supplier-order']);
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
		mutationFn: (data: ISupplierOrder) => {
			return lastValueFrom(
				this.supplierOrderService.updateStatusSupplierOrder({
					supplierOrderId: data.id,
					status: data.status,
				}),
			);
		},
		onSuccess: (data) => {
			console.log(data);

			this.toast.success('Cập nhật hóa đơn đặt thành công');
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

	constructor(
		private supplierOrderService: SupplierOrderService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private formService: AppFormService,
		private toast: ToastrService,
	) {
		this.activatedRoute.queryParams.subscribe({
			next: (value) => {
				this.id.set(value['id']);
				this.form().id = value['id'];
			},
		});
	}

	async onSubmit(status: number = -1) {
		this.form.update((t) => {
			t.details = this.selectedProducts.map((t) => ({
				productId: t.id,
				quantity: t.quantity,
				price: t.price,
			}));

			return t;
		});

		const result = await this.formService.validate<ISupplierOrder>(this.formSchema, this.form());

		if (result.message) {
			this.errors.set(result.message);
		}

		if (result.valid && result.data) {
			if (this.id() > 0) {
				if (status === 1) {
					this.updateStatusMutate.mutate({
						...result.data,
						status,
					});

					return;
				}

				if (status === 2) {
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

	onChangeDistributorId(event: any) {
		this.form.set({
			...this.form(),
			distributorId: event.id,
		});
	}

	onSelectProduct(event: IProduct[]) {
		this.selectedProducts =
			event.map((product) => {
				const foundItem = this.detailQuery.data()?.data?.details?.find((t) => t.productId === product.id);

				if (!foundItem) {
					product.quantity = 0;
					product.price = 0;

					return product;
				}

				product.quantity = foundItem.quantity;
				product.price = foundItem.price;

				return product;
			}) || [];
	}

	onChangeItemQuantity(index: number, event: string) {
		this.selectedProducts[index].quantity = parseInt(event);

		this.totalPrice = this.selectedProducts.reduce(
			(count, current) => (count += current.price * (current?.quantity || 0)),
			0,
		);
	}

	onChangeItemPrice(index: number, event: number) {
		this.selectedProducts[index].price = event;

		this.totalPrice = this.selectedProducts.reduce(
			(count, current) => (count += current.price * (current?.quantity || 0)),
			0,
		);
	}

	formatDate(value: string) {
		if (!value) {
			return '';
		}

		return format(value, 'dd/MM/yyyy');
	}

	handleTotalPrice() {
		return this.selectedProducts.reduce((count, current) => (count += current.price), 0);
	}
}
