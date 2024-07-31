import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { AppFormService } from 'app/_components/form/app-form.service';
import { queryKey } from 'config/query-key';
import { statusCoupon } from 'config/status';
import { ICoupon } from 'data/requests/coupon/coupon-request';
import { ICustomer } from 'data/requests/customer/customer.request';
import { format } from 'date-fns';
import { CouponService } from 'domain/services/coupon/coupon-service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { number, object, string } from 'yup';

@Component({
	selector: 'app-coupon-form',
	templateUrl: './coupon-form.component.html',
	styles: ``,
})
export class CouponFormComponent {
	status = statusCoupon;
	id: WritableSignal<number> = signal(-1);
	errors: WritableSignal<{ [key: string]: string }> = signal({});

	form = {
		type: 0,
		typeC: 0,
	} as ICoupon;

	formSchema = object({
		name: string().required(),
		internalCode: string().required(),
		type: number().required(),
		limit: number().required(),
		start: string().required(),
		end: string().required(),
		discount: number().when('type', {
			is: 0,
			then: (schema) => schema.required(),
		}),
		percentMax: number().when('type', {
			is: 0,
			then: (schema) => schema.required(),
		}),
		percent: number().when('type', {
			is: 1,
			then: (schema) => schema.required(),
		}),
		discountMax: number().when('type', {
			is: 1,
			then: (schema) => schema.required(),
		}),
	});

	detailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: [queryKey.promotion.detail(this.id())],
		enabled: this.id() != 0,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.promotionService.detailCoupon({ Id: this.id() }).pipe(takeUntil(abort$)));
		},
	}));

	addMutate = injectMutation(() => ({
		mutationFn: (data: ICoupon) => {
			return lastValueFrom(this.promotionService.addCoupon(data));
		},
		onSuccess: (data, payload) => {
			this.toast.success('Thêm mã giảm giá thành công');

			this.router.navigate(['/admin/business/coupon']);
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
		mutationFn: (data: ICoupon) => {
			return lastValueFrom(this.promotionService.updateCoupon(data));
		},
		onSuccess: (data, payload) => {
			this.toast.success('Cập nhật mã giảm giá thành công');

			this.router.navigate(['/admin/business/coupon']);
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
		mutationFn: (data: ICoupon) => {
			return lastValueFrom(
				this.promotionService.updateStatusCoupon({
					couponId: data.id,
					status: data.status,
				}),
			);
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật mã giảm giá thành công');

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

	constructor(
		private promotionService: CouponService,
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

	async onSubmit(status: number = -1) {
		const result = await this.formService.validate<ICoupon>(this.formSchema, this.form);

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
					start:
						format(result.data.start, 'yyyy-MM-dd') + 'T' + format(result.data.start, 'HH:mm:ss') + '.000Z',
					end: format(result.data.end, 'yyyy-MM-dd') + 'T' + format(result.data.end, 'HH:mm:ss') + '.000Z',
				});

				return;
			}

			this.addMutate.mutate({
				...result.data,
				start: format(result.data.start, 'yyyy-MM-dd') + 'T' + format(result.data.start, 'HH:mm:ss') + '.000Z',
				end: format(result.data.end, 'yyyy-MM-dd') + 'T' + format(result.data.end, 'HH:mm:ss') + '.000Z',
			});
		}
	}
}
