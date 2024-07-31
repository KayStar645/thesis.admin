// distributor.service.ts
import { Component, signal } from '@angular/core';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsDistributor } from 'config/breadcrumbs';
import { queryKey } from 'config/query-key';
import { RequestParams } from 'core/params/requestParams';
import { IDistributor } from 'data/requests/distributor/distributor.request';
import { DistributorService } from 'domain/services/distributor/distributor.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Subject, debounceTime, fromEvent, lastValueFrom, takeUntil } from 'rxjs';

@Component({
	selector: 'app-distributor-component',
	templateUrl: './distributor.component.html',
	providers: [],
})
export class DistributorComponent {
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;
	distributorId: number = -1;
	subject: Subject<string> = new Subject();
	currentPage = signal(1);
	keyword = signal('');

	buttons = [
		{
			svgContent: '../../../../../../assets/icons/plus_math.svg',
			valueButton: 'Tạo mới',
			valueClass:
				'border border-green-500 text-white bg-gradient-to-t from-green-500 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg  space-x-2 px-3 py-1 text-center me-2',
			buttonClicked: () => (this.distributorId = 0),
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/add.svg',
			valueButton: 'Nhập Excel',
			valueClass:
				'border border-yellow-500 text-amber-800 bg-gradient-to-t from-yellow-300 via-yellow-200 to-yellow-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-400  font-medium rounded-lg  space-x-2  px-3 py-1 text-center  me-2 mb-2',
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/microsoft_excel.svg',
			valueButton: 'Xuất Excel',
			valueClass:
				'border border-teal-500 text-green-800 bg-gradient-to-t from-teal-300 via-teal-200 to-teal-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-400  font-medium rounded-lg   space-x-2 px-3 py-1 text-center  me-2 mb-2',
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/export_pdf.svg',
			valueButton: 'Xuất PDF',
			valueClass:
				'border border-rose-500 text-rose-800 bg-gradient-to-t from-rose-300 via-rose-200 to-rose-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-rose-400  font-medium rounded-lg  space-x-2  px-3 py-1 text-center  me-2 mb-2',
			valueClassSvgContent: 'h-7 w-7',
		},
	];

	columns: { title: string; key: keyof IDistributor }[] = [
		{
			title: 'Mã nhà cung cấp',
			key: 'internalCode',
		},
		{
			title: 'Tên nhà cung cấp',
			key: 'name',
		},
		{
			title: 'Số điện thoại',
			key: 'phone',
		},
		{
			title: 'Email',
			key: 'email',
		},
	];

	distributorQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.distributor.list({
			keyword: this.keyword(),
			page: this.currentPage(),
			pageSize: 10,
		}),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			const params: RequestParams = {
				filters: `(Name|InternalCode|Email|Phone)@=${this.keyword()}`,
				sorts: '',
				page: this.currentPage(),
				pageSize: 10,
			};

			return lastValueFrom(this.distributorService.getDistributor(params).pipe(takeUntil(abort$)));
		},
	}));

	distributorDeleteMutate = injectMutation(() => ({
		mutationFn: (id: number) => {
			return lastValueFrom(this.distributorService.deleteDistributor({ Id: id }));
		},
		onSuccess: (data) => {
			this.distributorQuery.refetch();

			this.toast.success('Xóa nhà cung cấp thành công');
		},
		onError: (err) => {
			this.toast.error(err.message);
		},
	}));

	constructor(
		breadcrumbService: BreadcrumbService,
		private toast: ToastrService,
		private distributorService: DistributorService,
		private confirmationService: ConfirmationService,
	) {
		this.breadcrumbService = breadcrumbService;
	}

	ngOnInit() {
		this.breadcrumbs = breadcrumbsDistributor;

		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);

		this.subject.pipe(debounceTime(500)).subscribe((value) => {
			this.keyword.set(value);

			this.distributorQuery.refetch();
		});
	}

	onChangeKeyword(event: Event) {
		const target = event.target as HTMLInputElement;

		this.subject.next(target.value);
	}

	handlePage(pageNumber: number) {
		this.currentPage.set(pageNumber);
	}

	handleRowAction(eventData: { action: string; data: IDistributor; event: MouseEvent }) {
		if (eventData.action === 'update') {
			this.distributorId = eventData.data.id;
		}

		if (eventData.action === 'delete') {
			this.confirmationService.confirm({
				target: eventData.event.target as EventTarget,
				message: 'Bạn có chắc muốn xóa nhà cung cấp này',
				header: 'Thông báo',
				icon: 'pi pi-exclamation-triangle',
				acceptLabel: 'Đồng ý',
				rejectLabel: 'Hủy',
				acceptButtonStyleClass:
					'px-3 py-2 bg-green-500 hover:bg-green-600 cursor-pointer rounded-md text-white ml-3',
				rejectButtonStyleClass: 'px-3 py-2 bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-md text-white',
				accept: () => {
					this.distributorDeleteMutate.mutate(eventData.data.id);
				},
				reject: () => {},
			});
		}
	}
}
