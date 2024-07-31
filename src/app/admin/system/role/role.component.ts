import { Component, OnInit, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsRole } from 'config/breadcrumbs';
import { queryKey } from 'config/query-key';
import { RequestParams } from 'core/params/requestParams';
import { ExtraList } from 'core/types/types';
import { IRole } from 'data/requests/role/role.request';
import { RoleService } from 'domain/services/role/role.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, fromEvent, lastValueFrom, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-role',
	templateUrl: './role.component.html',
	styleUrl: './role.component.scss',
})
export class RoleComponent implements OnInit {
	breadcrumbs: IBreadcrumb[] = [];
	breadcrumbService: BreadcrumbService;
	roleId: number = -1;
	keyword = signal('');
	debounce: Subject<string> = new Subject();
	currentPage = signal(1);

	buttons = [
		{
			svgContent: '../../../../../../assets/icons/plus_math.svg',
			valueButton: 'Tạo mới',
			valueClass:
				'border border-green-500 text-white bg-gradient-to-t from-green-500 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg  space-x-2 px-3 py-1 text-center me-2',
			buttonClicked: () => (this.roleId = 0),
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/add.svg',
			valueButton: 'Nhập Excel',
			valueClass:
				'border border-yellow-500 text-amber-800 bg-gradient-to-t from-yellow-300 via-yellow-200 to-yellow-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-400  font-medium rounded-lg  space-x-2  px-3 py-1 text-center  me-2 mb-2',
			buttonClicked: 'handleCreateButtonClick',
			valueClassSvgContent: 'h-7 w-7',
		},
		{
			svgContent: '../../../../../../assets/icons/microsoft_excel.svg',
			valueButton: 'Xuất Excel',
			valueClass:
				'border border-teal-500 text-green-800 bg-gradient-to-t from-teal-300 via-teal-200 to-teal-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-400  font-medium rounded-lg   space-x-2 px-3 py-1 text-center  me-2 mb-2',
			buttonClicked: 'handleCreateButtonClick',
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

	columns: {
		title: string;
		getter: (item: IRole) => any;
		name?: string;
		class?: string;
	}[] = [
		{
			title: 'Tên vai trò',
			getter: (item: IRole) => item['name'],
		},
	];

	roleQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: queryKey.role.list({
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

			return lastValueFrom(this.roleService.getRole_pageparams(params).pipe(takeUntil(abort$)));
		},
	}));

	constructor(breadcrumbService: BreadcrumbService, private toast: ToastrService, private roleService: RoleService) {
		this.breadcrumbService = breadcrumbService;
	}

	ngOnInit() {
		this.breadcrumbs = breadcrumbsRole;

		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);

		this.debounce.pipe(debounceTime(500)).subscribe((value) => {
			this.keyword.set(value);

			this.roleQuery.refetch();
		});
	}

	onChangeKeyword(event: Event) {
		const target = event.target as HTMLInputElement;

		this.debounce.next(target.value);
	}

	handleButtonClick(button: any) {
		if (typeof button.buttonClicked === 'function') {
			button.buttonClicked();
		} else {
			console.error('Invalid buttonClicked function.');
		}
	}

	handlePage(pageNumber: number) {
		this.currentPage.set(pageNumber);
	}

	handleRowAction(eventData: { action: string; data: IRole; event: MouseEvent }) {
		if (eventData.action === 'update') {
			this.roleId = eventData.data.id;
		}
	}
}
