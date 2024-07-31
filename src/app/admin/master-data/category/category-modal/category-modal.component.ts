import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { AppFormService } from 'app/_components/form/app-form.service';
import { queryKey } from 'config/query-key';
import { ICategory } from 'data/requests/category/category.request';
import { CategoryService } from 'domain/services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { number, object, string } from 'yup';

@Component({
	selector: 'app-category-modal',
	templateUrl: './category-modal.component.html',
	styles: ``,
})
export class CategoryModalComponent {
	@Input({ required: true }) id!: number;

	@Output() onCancel = new EventEmitter();
	@Output() onSuccess = new EventEmitter();

	visible = true;

	formSchema = object({
		id: number(),
		name: string().required(),
		internalCode: string().required(),
		icon: string().optional(),
	});

	form = {} as ICategory;

	errors: WritableSignal<{ [key: string]: string }> = signal({});

	categoryColumns: {
		title: string;
		getter: (item: ICategory) => any;
		name?: string;
		class?: string;
	}[] = [
		{ title: 'Mã loại sản phẩm', getter: (item: ICategory) => item['internalCode'] },
		{ title: 'Tên loại sản phẩm', getter: (item: ICategory) => item['name'] },
		{ title: 'Nhóm cha', getter: (item: ICategory) => item['parent']?.name },
		{ title: '', getter: (item: ICategory) => item['isChecked'] },
	];

	constructor(
		private categoryService: CategoryService,
		private formService: AppFormService,
		private toast: ToastrService,
	) {}

	detailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.category.detail(this.id),
		enabled: this.id > 0,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.categoryService.detailCategory({ Id: this.id }).pipe(takeUntil(abort$)));
		},
	}));

	addMutate = injectMutation(() => ({
		mutationFn: (data: ICategory) => {
			return lastValueFrom(this.categoryService.addCategory(data));
		},
		onSuccess: (data) => {
			this.toast.success('Thêm loại sản phẩm thành công');

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
		mutationFn: (data: ICategory) => {
			return lastValueFrom(this.categoryService.updateCategory(data));
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật loại sản phẩm thành công');

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

	_onCancel() {
		this.onCancel.emit();
	}

	async onSubmit() {
		const result = await this.formService.validate<ICategory>(this.formSchema, { ...this.form, id: this.id });

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
