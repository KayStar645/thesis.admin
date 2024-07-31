import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { queryKey } from 'config/query-key';
import { statusOrder } from 'config/status';
import { IUpdateOrderStatus } from 'data/requests/order/update-order-status-request';
import { format } from 'date-fns';
import { OrderService } from 'domain/services/order/order-service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';

@Component({
	selector: 'app-order-form',
	templateUrl: './order-form.component.html',
	styles: ``,
})
export class OrderFormComponent {
	id: WritableSignal<number> = signal(-1);
	status = statusOrder;

	detailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: [queryKey.order.detail(this.id())],
		enabled: this.id() != 0,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.orderService.detailOrder({ Id: this.id() }).pipe(takeUntil(abort$)));
		},
	}));

	updateStatusMutate = injectMutation(() => ({
		mutationFn: (data: IUpdateOrderStatus) => {
			return lastValueFrom(
				this.orderService.updateOrderStatus({
					orderId: data.orderId,
					status: data.status,
				}),
			);
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật đơn hàng thành công');

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
		private orderService: OrderService,
		private activatedRoute: ActivatedRoute,
		private toast: ToastrService,
	) {
		this.activatedRoute.queryParams.subscribe({
			next: (value) => {
				this.id.set(value['id']);
			},
		});
	}

	async onSubmit(status: number) {
		this.updateStatusMutate.mutate({
			orderId: this.id(),
			status,
		});
	}

	formatDate(value: string) {
		if (!value) {
			return '';
		}

		return format(value, 'dd/MM/yyyy');
	}
}
