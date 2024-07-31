import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { AppFormService } from 'app/_components/form/app-form.service';
import { queryKey } from 'config/query-key';
import { IDistributor } from 'data/requests/distributor/distributor.request';
import { DistributorService } from 'domain/services/distributor/distributor.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { number, object, string } from 'yup';

@Component({
	selector: 'app-distributor-modal',
	templateUrl: './distributor-modal.component.html',
	styles: ``,
})
export class DistributorModalComponent {
	@Input({ required: true }) id!: number;

	@Output() onCancel = new EventEmitter();
	@Output() onSuccess = new EventEmitter();

	visible = true;

	formSchema = object({
		id: number(),
		name: string().required(),
		internalCode: string().required(),
	});

	form = {} as IDistributor;

	errors: WritableSignal<{ [key: string]: string }> = signal({});

	constructor(
		private distributorService: DistributorService,
		private formService: AppFormService,
		private toast: ToastrService,
	) {}

	detailQuery = injectQuery(() => ({
		queryKey: queryKey.distributor.detail(this.id),
		enabled: this.id > 0,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.distributorService.detailDistributor({ Id: this.id }).pipe(takeUntil(abort$)));
		},
	}));

	addMutate = injectMutation(() => ({
		mutationFn: (data: IDistributor) => {
			return lastValueFrom(this.distributorService.addDistributor(data));
		},
		onSuccess: (data) => {
			this.toast.success('Thêm nhà cung cấp thành công');

			this.onSuccess.emit();
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
		mutationFn: (data: IDistributor) => {
			return lastValueFrom(this.distributorService.updateDistributor(data));
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật nhà cung cấp thành công');

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
		const result = await this.formService.validate<IDistributor>(this.formSchema, { ...this.form, id: this.id });

		console.log(result);

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
