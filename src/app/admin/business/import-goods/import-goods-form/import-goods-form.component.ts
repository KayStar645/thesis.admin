import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { AppFormService } from 'app/_components/form/app-form.service';
import { queryKey } from 'config/query-key';
import { statusSupplierOrder } from 'config/status';
import { IImportGoods } from 'data/requests/import-goods/import-goods-request';
import { IProduct } from 'data/requests/product/product.request';
import { ISupplierOrder } from 'data/requests/supplier-order/supplier-order.request';
import { format } from 'date-fns';
import { ImportGoodsService } from 'domain/services/import-goods/import-goods-service';
import { SupplierOrderService } from 'domain/services/supplier-order/supplier-order.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { array, number, object, string } from 'yup';

@Component({
	selector: 'app-import-goods-form',
	templateUrl: './import-goods-form.component.html',
	styles: ``,
})
export class ImportGoodsFormComponent {
	id: WritableSignal<number> = signal(-1);
	status = statusSupplierOrder;
	errors: WritableSignal<{ [key: string]: string }> = signal({});
	selectedProducts: IProduct[] = [];

	form: WritableSignal<IImportGoods> = signal({
		supplierOrderId: -1,
		details: [] as any[],
		receivingStaff: '',
	} as IImportGoods);

	formSchema = object({
		supplierOrderId: number().min(1),
		details: array().min(1),
		receivingStaff: string().min(1),
	});

	detailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: [queryKey.importGoods.detail(this.id())],
		enabled: this.id() != 0,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.importGoodsService.detailImportGoods({ Id: this.id() }).pipe(takeUntil(abort$)));
		},
	}));

	supplierOrderDetailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: [queryKey.supplierOrder.detail(this.form().id || this.detailQuery.data()?.data?.parentId)],
		enabled: this.form().supplierOrderId > 0 || !!this.detailQuery.data()?.data?.parentId,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(
				this.supplierOrderServices
					.getProducts({ Id: this.detailQuery.data()?.data?.parentId! || this.form().supplierOrderId })
					.pipe(takeUntil(abort$)),
			);
		},
	}));

	supplierOrderColumns: {
		title: string;
		getter: (item: ISupplierOrder) => void;
		name?: string;
		class?: string;
	}[] = [
		{
			title: 'Mã phiếu',
			getter: (item: ISupplierOrder) => item['internalCode'],
		},
		{
			title: 'Người lập phiếu',
			getter: (item: ISupplierOrder) => item['approveStaff']?.name,
		},
		{
			title: 'Ngày tạo phiếu',
			class: 'text-center',
			getter: (item: ISupplierOrder) => format(item['bookingDate']!, 'dd/MM/yyyy HH:mm:ss'),
		},
		{
			title: 'Tổng giá trị',
			class: 'text-right',
			getter: (item: ISupplierOrder) => item['total']?.toLocaleString('vi-VN') + 'đ',
		},
		{ title: '', getter: (item: ISupplierOrder) => item['isChecked'] },
	];

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
			title: 'Số lượng đặt',
			getter: (item: IProduct) => item['orderQuantity'],
		},
		{
			title: '',
			getter: (item: IProduct) => item['isChecked'],
		},
	];

	addMutate = injectMutation(() => ({
		mutationFn: (data: IImportGoods) => {
			return lastValueFrom(this.importGoodsService.addImportGoods(data));
		},
		onSuccess: (data) => {
			this.toast.success('Thêm hóa đơn nhập thành công');

			this.router.navigate(['admin/business/import-goods']);
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
		mutationFn: (data: IImportGoods) => {
			return lastValueFrom(this.importGoodsService.updateImportGoods(data));
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật hóa đơn nhập thành công');
			this.router.navigate(['admin/business/import-goods']);
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
		mutationFn: (data: IImportGoods) => {
			return lastValueFrom(
				this.importGoodsService.updateStatusImportGoods({
					supplierOrderId: data.id,
					isCancel: data.isCancel,
				}),
			);
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật hóa đơn nhập thành công');

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
		private importGoodsService: ImportGoodsService,
		private supplierOrderServices: SupplierOrderService,
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
				importQuantity: t.quantity,
			}));

			return t;
		});

		const result = await this.formService.validate<IImportGoods>(this.formSchema, this.form());

		if (result.message) {
			this.errors.set(result.message);
		}

		if (result.valid && result.data) {
			if (this.id() > 0) {
				if (status === 1) {
					this.updateStatusMutate.mutate({
						...result.data,
						isCancel: true,
					});

					return;
				}

				if (status === 2) {
					this.updateStatusMutate.mutate({
						...result.data,
						isCancel: false,
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

	onChangeStaff(event: string) {
		this.form.update((t) => {
			t.receivingStaff = event;

			return t;
		});
	}

	onChangeSupplierId(event: any) {
		this.form.set({
			...this.form(),
			supplierOrderId: event.id,
		});
	}

	onSelectProduct(event: IProduct[]) {
		this.selectedProducts = event;

		this.selectedProducts.forEach((product) => {
			const indexFound = (this.detailQuery.data()?.data?.details || [])?.findIndex((t) => t.id === product.id);

			if (indexFound > -1) {
				this.selectedProducts[indexFound].quantity =
					this.detailQuery.data()?.data?.details[indexFound].quantity;

				return;
			}

			product.importQuantity = 0;
		});
	}

	onChangeItemQuantity(index: number, event: number) {
		this.selectedProducts[index].quantity = event;
	}

	formatDate(value: string) {
		if (!value) {
			return '';
		}

		return format(value, 'dd/MM/yyyy');
	}
}
