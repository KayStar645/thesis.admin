// employee.service.ts
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsStaff } from 'config/breadcrumbs';
import { queryKey } from 'config/query-key';
import { RequestParams } from 'core/params/requestParams';
import { IEmployee } from 'data/requests/staff/employees.request';
import { format } from 'date-fns';
import { EmployeeService } from 'domain/services/staff/employee.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { debounceTime, fromEvent, lastValueFrom, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-staff-component',
	templateUrl: './staff.component.html',
	providers: [],
})
export class StaffComponent implements OnInit {
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;
	keyword = signal('');
	debounce: Subject<string> = new Subject();
	currentPage = signal(1);

	columns: {
		title: string;
		getter: (item: IEmployee) => any;
		name?: string;
		class?: string;
	}[] = [
		{ title: 'Mã nhân viên', getter: (item: IEmployee) => item['internalCode'] },
		{ title: 'Tên nhân viên', getter: (item: IEmployee) => item['name'] },
		{ title: 'Email', getter: (item: IEmployee) => item['email'] },
		{ title: 'Số điện thoại', class: 'text-center', getter: (item: IEmployee) => item['phoneNumber'] },
		{
			title: 'Ngày sinh',
			class: 'text-center',
			getter: (item: IEmployee) => (item['dateOfBirth'] ? format(item['dateOfBirth'], 'dd/MM/yyyy') : ''),
		},
		{ title: 'Giới tính', class: 'text-center', getter: (item: IEmployee) => item['gender'] },
	];

	employeeQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.staff.list({
			keyword: this.keyword(),
			page: this.currentPage(),
			pageSize: 10,
		}),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			const params: RequestParams = {
				filters: `(Name|InternalCode)@=${this.keyword()}`,
				sorts: '',
				page: this.currentPage(),
				pageSize: 10,
			};

			return lastValueFrom(this.employeeService.getEmployees_pageparams(params).pipe(takeUntil(abort$)));
		},
	}));

	employeeDeleteMutate = injectMutation(() => ({
		mutationFn: (id: number) => {
			return lastValueFrom(this.employeeService.deleteEmployee({ Id: id }));
		},
		onSuccess: (data) => {
			this.employeeQuery.refetch();

			this.toast.success('Xóa nhân viên thành công');
		},
		onError: (err) => {
			this.toast.error(err.message);
		},
	}));

	buttons = [
		{
			svgContent: '../../../../../../assets/icons/plus_math.svg',
			valueButton: 'Tạo mới',
			valueClass:
				'border border-green-500 text-white bg-gradient-to-t from-green-500 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg  space-x-2 px-3 py-1 text-center me-2',
			buttonClicked: () => {
				this.router.navigate(['admin/system/staff/form'], {
					queryParams: {
						id: 0,
					},
				});
			},
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/add.svg',
			valueButton: 'Nhập Excel',
			valueClass:
				'border border-yellow-500 text-amber-800 bg-gradient-to-t from-yellow-300 via-yellow-200 to-yellow-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-400  font-medium rounded-lg  space-x-2  px-3 py-1 text-center  me-2',
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/microsoft_excel.svg',
			valueButton: 'Xuất Excel',
			valueClass:
				'border border-teal-500 text-green-800 bg-gradient-to-t from-teal-300 via-teal-200 to-teal-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-400  font-medium rounded-lg   space-x-2 px-3 py-1 text-center  me-2 ',
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/export_pdf.svg',
			valueButton: 'Xuất PDF',
			valueClass:
				'border border-rose-500 text-rose-800 bg-gradient-to-t from-rose-300 via-rose-200 to-rose-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-rose-400  font-medium rounded-lg  space-x-2  px-3 py-1 text-center  me-2',
			valueClassSvgContent: 'h-7 w-7',
		},
	];

	constructor(
		breadcrumbService: BreadcrumbService,
		private employeeService: EmployeeService,
		private router: Router,
		private toast: ToastrService,
		private confirmationService: ConfirmationService,
	) {
		this.breadcrumbs = breadcrumbsStaff;
		this.breadcrumbService = breadcrumbService;
		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
	}

	ngOnInit() {
		this.debounce.pipe(debounceTime(500)).subscribe((value) => {
			this.keyword.set(value);
		});
	}

	handleRowAction(eventData: { action: string; data: IEmployee; event: MouseEvent }) {
		if (eventData.action === 'update') {
			this.router.navigate(['admin/system/staff/form'], {
				queryParams: {
					id: eventData.data.id,
				},
			});
		}

		if (eventData.action === 'delete') {
			this.confirmationService.confirm({
				target: eventData.event.target as EventTarget,
				message: 'Bạn có chắc muốn xóa nhân viên này',
				header: 'Thông báo',
				icon: 'pi pi-exclamation-triangle',
				acceptLabel: 'Đồng ý',
				rejectLabel: 'Hủy',
				acceptButtonStyleClass:
					'px-3 py-2 bg-green-500 hover:bg-green-600 cursor-pointer rounded-md text-white ml-3',
				rejectButtonStyleClass: 'px-3 py-2 bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-md text-white',
				accept: () => {
					this.employeeDeleteMutate.mutate(eventData.data.id);
				},
				reject: () => {},
			});
		}
	}

	onPageChange(pageNumber: number) {
		this.currentPage.set(pageNumber);
	}

	onChangeKeyword(event: Event) {
		const target = event.target as HTMLInputElement;

		this.debounce.next(target.value);
	}
}
