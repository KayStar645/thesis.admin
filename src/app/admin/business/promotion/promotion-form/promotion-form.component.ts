import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { AppFormService } from 'app/_components/form/app-form.service';
import { queryKey } from 'config/query-key';
import { statusPromotion } from 'config/status';
import { IApplyPromotionProduct } from 'data/requests/promotion/apply.promotion.product.request';
import { PromotionForProduct } from 'data/requests/promotion/detail.promotion.request';
import { IPromotion } from 'data/requests/promotion/promotion.request';
import { format } from 'date-fns';
import { PromotionService } from 'domain/services/promotion/promotion.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { number, object, string } from 'yup';

@Component({
	selector: 'app-promotion-form',
	templateUrl: './promotion-form.component.html',
	styles: ``,
})
export class PromotionFormComponent {
	status = statusPromotion;
	id: WritableSignal<number> = signal(-1);
	errors: WritableSignal<{ [key: string]: string }> = signal({});

	promotionProducts: PromotionForProduct[] = [];

	form = {
		type: 0,
	} as IPromotion;

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

			return lastValueFrom(this.promotionService.detailPromotion({ Id: this.id() }).pipe(takeUntil(abort$)));
		},
	}));

	addMutate = injectMutation(() => ({
		mutationFn: (data: IPromotion) => {
			return lastValueFrom(this.promotionService.addPromotion(data));
		},
		onSuccess: (data, payload) => {
			this.applyProductToPromotion(data.data.id);
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
		mutationFn: (data: IPromotion) => {
			return lastValueFrom(this.promotionService.updatePromotion(data));
		},
		onSuccess: (data, payload) => {
			this.applyProductToPromotion();
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

	updateProductPromotionMutate = injectMutation(() => ({
		mutationFn: (data: IApplyPromotionProduct) => {
			return lastValueFrom(this.promotionService.updatePromotionForProduct(data));
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
		mutationFn: (data: IPromotion) => {
			return lastValueFrom(
				this.promotionService.updateStatusPromotion({
					promotionId: data.id,
					status: data.status,
				}),
			);
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật chương trình khuyến mãi thành công');

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

	applyProductToPromotion(id: number = this.id()) {
		let check = true;

		this.promotionProducts.forEach(async (t) => {
			try {
				await this.updateProductPromotionMutate.mutateAsync({
					group: t.group,
					productsId: t.groupProducts,
					promotionId: id,
				});
			} catch (error: any) {
				this.toast.error(error.error.messages[0] || error.message);
				check = false;
			}
		});

		if (check) {
			this.toast.success('Cập nhật chương trình khuyến mãi thành công');
			this.router.navigate(['admin/business/promotion']);
		}
	}

	constructor(
		private promotionService: PromotionService,
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
		const result = await this.formService.validate<IPromotion>(this.formSchema, this.form);

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

	onUpdateGroup(event: PromotionForProduct[]) {
		this.promotionProducts = event;
	}
}
