import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { AppFormService } from 'app/_components/form/app-form.service';
import { queryKey } from 'config/query-key';
import { IPaymentMethod } from 'data/requests/payment-method/payment-method.request';
import { PaymentMethodService } from 'domain/services/payment-method/payment-method.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { number, object, string } from 'yup';

@Component({
	selector: 'app-payment-method-modal',
	templateUrl: './payment-method-modal.component.html',
	styles: ``,
})
export class PaymentMethodModalComponent {
	@Input({ required: true }) id!: number;

	@Output() onCancel = new EventEmitter();
	@Output() onSuccess = new EventEmitter();

	visible = true;

	formSchema = object({
		id: number(),
		name: string().required(),
		internalCode: string().required(),
	});

	form = {} as IPaymentMethod;

	errors: WritableSignal<{ [key: string]: string }> = signal({});

	constructor(
		private paymentMethodService: PaymentMethodService,
		private formService: AppFormService,
		private toast: ToastrService,
	) {}

	detailQuery = injectQuery(() => ({
		queryKey: queryKey.paymentMethod.detail(this.id),
		enabled: this.id > 0,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(
				this.paymentMethodService.detailPaymentMethod({ Id: this.id }).pipe(takeUntil(abort$)),
			);
		},
	}));

	addMutate = injectMutation(() => ({
		mutationFn: (data: IPaymentMethod) => {
			return lastValueFrom(this.paymentMethodService.addPaymentMethod(data));
		},
		onSuccess: (data) => {
			this.toast.success('Thêm phương thức thanh toán thành công');

			this.onSuccess.emit();
		},
		onError: (error: any) => {
			this.toast.error(error.error.messages[0] || error.message);
		},
	}));

	updateMutate = injectMutation(() => ({
		mutationFn: (data: IPaymentMethod) => {
			return lastValueFrom(this.paymentMethodService.updatePaymentMethod(data));
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật phương thức thanh toán thành công');

			this.onSuccess.emit();
		},
		onError: (error: any) => {
			this.toast.error(error.error.messages[0] || error.message);
		},
	}));

	_onCancel() {
		this.onCancel.emit();
	}

	async onSubmit() {
		const result = await this.formService.validate<IPaymentMethod>(this.formSchema, { ...this.form, id: this.id });

		if (result.message) {
			this.errors.set(result.message);
		}

		if (result.valid && result.data) {
			if (this.id > 0) {
				this.updateMutate.mutate(result.data);

				return;
			}

			this.addMutate.mutate(result.data);

			return;
		}
	}
}
