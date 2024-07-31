import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { AppFormService } from 'app/_components/form/app-form.service';
import { queryKey } from 'config/query-key';
import { statusDelivery } from 'config/status';
import { IDelivery } from 'data/requests/delivery/delivery-request';
import { IUpdateDeliveryStatus } from 'data/requests/delivery/update-delivery-status-request';
import { IOrder } from 'data/requests/order/order-request';
import { format } from 'date-fns';
import { DeliveryService } from 'domain/services/delivery/delivery-service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { number, object, string } from 'yup';

@Component({
	selector: 'app-delivery-modal',
	templateUrl: './delivery-modal.component.html',
	styles: ``,
})
export class DeliveryModalComponent {
	@Input({ required: true }) id!: number;

	@Output() onCancel = new EventEmitter();
	@Output() onSuccess = new EventEmitter();

	visible = true;

	formSchema = object({
		from: string().required(),
		to: string().required(),
		transportFee: string().required(),
		orderId: number().required(),
	});

	form = {} as IDelivery;

	status = statusDelivery;

	errors: WritableSignal<{ [key: string]: string }> = signal({});

	orderColumns: {
		title: string;
		getter: (item: IOrder) => any;
		name?: string;
		class?: string;
	}[] = [
		{ title: 'Mã đơn', getter: (item: IOrder) => item['internalCode'] },
		{ title: 'Khách hàng', getter: (item: IOrder) => item['customer'].name },
		{ title: 'Ngày đặt', getter: (item: IOrder) => format(item['date'], 'dd/MM/yyyy') },
		{ title: 'Tổng tiền', getter: (item: IOrder) => item['total'].toLocaleString('vi-VN') },
		{ title: '', getter: (item: IOrder) => item['isSelected'] },
	];

	constructor(
		private deliveryService: DeliveryService,
		private formService: AppFormService,
		private toast: ToastrService,
	) {}

	detailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.delivery.detail(this.id),
		enabled: this.id > 0,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.deliveryService.detailDelivery({ Id: this.id }).pipe(takeUntil(abort$)));
		},
	}));

	addMutate = injectMutation(() => ({
		mutationFn: (data: IDelivery) => {
			return lastValueFrom(this.deliveryService.addDelivery(data));
		},
		onSuccess: (data) => {
			this.toast.success('Thêm loại sản phẩm thành công');

			this.onSuccess.emit();
		},
		onError: (error: any) => {
			this.toast.error(error.error.messages[0] || error.message);
		},
	}));

	updateMutate = injectMutation(() => ({
		mutationFn: (data: IDelivery) => {
			return lastValueFrom(this.deliveryService.updateDelivery(data));
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật đơn giao hàng thành công');

			this.onSuccess.emit();
		},
		onError: (error: any) => {
			this.toast.error(error.error.messages[0] || error.message);
		},
	}));

	updateStatusMutate = injectMutation(() => ({
		mutationFn: (data: IUpdateDeliveryStatus) => {
			return lastValueFrom(
				this.deliveryService.updateDeliveryStatus({
					deliveryId: data.deliveryId,
					status: data.status,
				}),
			);
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật đơn giao hàng thành công');

			this.detailQuery.refetch();
		},
		onError: (error: any) => {
			this.toast.error(error.error.messages[0] || error.message);
		},
	}));

	_onCancel() {
		this.onCancel.emit();
	}

	async onSubmit(status: number = -1) {
		const result = await this.formService.validate<IDelivery>(this.formSchema, { ...this.form, id: this.id });

		if (result.message) {
			this.errors.set(result.message);
		}

		if (result.valid && result.data) {
			if (this.id > 0) {
				if (status > 0) {
					this.updateStatusMutate.mutate({
						deliveryId: this.id,
						status,
					});

					return;
				}

				this.updateMutate.mutate(result.data);

				return;
			}

			this.addMutate.mutate(result.data);

			return;
		}
	}
}
