import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
	selector: 'app-order-detail-form',
	templateUrl: './order-detail-form.component.html',
	styles: ``,
})
export class OrderDetailFormComponent implements OnChanges {
	@Input({ required: true }) id: number = -1;
	@Input({ required: true }) dialogHeader: string = '';
	@Input({ required: true }) valueField: string = '';
	@Input({ required: true }) labelField: string = '';
	@Input() label: string = '';
	@Input() value?: string | number = '';
	@Input() placeholder: string = '';
	@Input() required: boolean = false;
	@Input() errorMessage: string = '';
	@Input() disabled: boolean = false;
	@Input() isAllDetail: boolean = false;
	@Input() dialogWidth: string = '80vw';
	@Input() filters: string = '';
	loading = false;
	selected: any = {};
	data: any[] = [];
	@Input() visible: boolean = false;
	@Output() visibleChange = new EventEmitter<boolean>();
	@Output() dialogClose = new EventEmitter<boolean>();
	ngOnChanges(changes: SimpleChanges) {
		if (changes['id'] && !changes['id'].firstChange) {
			this.loadOrderDetails();
		}
	}

	loadOrderDetails() {
		// Refetch the order details when id changes
		this.detailQuery.refetch();
	}
	closeDialog() {
		this.dialogClose.emit();
	}
	get isVisible(): boolean {
		return this.visible;
	}

	set isVisible(value: boolean) {
		this.visible = value;
		this.visibleChange.emit(this.visible);
	}

	status = statusOrder;

	detailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: [queryKey.order.detail(this.id)],
		enabled: this.id != 0,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.orderService.detailOrder({ Id: this.id }).pipe(takeUntil(abort$)));
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

	constructor(private orderService: OrderService, private toast: ToastrService) {}

	async onSubmit(status: number) {
		this.updateStatusMutate.mutate({
			orderId: this.id,
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
