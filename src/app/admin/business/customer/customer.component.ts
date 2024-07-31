// staff.service.ts
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'app/_components/modal/services/modal.service';
import { NotificationModalService } from 'app/admin/_components/ui/notification/services/notification.modal.service';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { breadcrumbsCustomer } from 'config/breadcrumbs';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { ExtraList } from 'core/types/types';
import { ICustomer } from 'data/requests/customer/customer.request';
import { AuthService } from 'domain/services/auth/auth.service';
import { CustomerService } from 'domain/services/customer/customer.service';
import { UpdateCustomerModalService } from './update.customer.modal/update.customer.service.modal/update.customer.service.modal';

@Component({
	selector: 'app-customer-component',
	templateUrl: './customer.component.html',
	providers: [AuthService, CustomerService, UpdateCustomerModalService],
})
export class CustomerComponent implements OnInit {
	public breadcrumbs: IBreadcrumb[] = [];
	public breadcrumbService: BreadcrumbService;
	customers: ICustomer[] = [];
	@ViewChild('modalTemplateDeleteSelect', { static: true })
	modalTemplateDeleteSelect!: TemplateRef<any>;
	@ViewChild('modalTemplateDelete', { static: true })
	modalTemplateDelete!: TemplateRef<any>;
	@ViewChild('modalTemplateCreate', { static: true })
	modalTemplateCreate!: TemplateRef<any>;
	@ViewChild('modalTemplateUpdate', { static: true })
	modalTemplateUpdate!: TemplateRef<any>;
	pagination: ExtraList = {
		currentPage: 1,
		totalPages: 10,
		totalCount: 100,
		pageSize: 26,
	};
	page: number = 1;
	isChecked: boolean = false;

	//Hàm khưởi tạo
	ngOnInit() {
		this.breadcrumbs = breadcrumbsCustomer;
		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
		console.log(this.authService.isLoggedIn());
		if (this.authService.isLoggedIn() === false) {
			this.router.navigate(['/auth/login']);
		}
	}

	//Hàm khởi tạo
	constructor(
		private modalService: ModalService,
		private modalServiceNotification: NotificationModalService,
		breadcrumbService: BreadcrumbService,
		private router: Router,
		private authService: AuthService,
		private cdr: ChangeDetectorRef,
		private updateCustomerModalService: UpdateCustomerModalService,
		private customerService: CustomerService,
	) {
		this.breadcrumbService = breadcrumbService;
		this.getCusomers();
	}

	//Load danh sách bảng
	getCusomers() {
		const params: RequestParams = {
			filters: '',
			sorts: '',
			page: this.page,
			pageSize: this.pagination.pageSize || 6,
		};
		this.customerService.getCustomer_pageparams(params).subscribe((result) => {
			this.customers = result.data || [];
			this.pagination = result.extra;
		});
	}

	openModalUpdate(modalTemplate: TemplateRef<any>, CustomerIdToFind?: number) {
		const foundCustomer = this.customers.find((customer) => customer.id === CustomerIdToFind);
		console.log(foundCustomer);
		if (foundCustomer) {
			this.updateCustomerModalService.open(modalTemplate, { customer: foundCustomer }).subscribe((action) => {
				console.log('modalAction', action);
				if (action == 'closed') {
					this.getCusomers();
					console.log(this.customers);
					this.cdr.detectChanges();
				}
			});
		} else {
			console.error('Không tìm thấy nhân viên có ID:', CustomerIdToFind);
		}
	}

	//Hàm thay đổi trang
	handlePage(pagenumber: number) {
		console.log(this.pagination.totalPages);
		if (pagenumber < (this.pagination.totalPages || 0) && pagenumber > 0) {
			this.page = pagenumber;
			this.cdr.detectChanges();
			this.getCusomers();
		}
	}
	//Mở modal nhắc nhở xóa
	openModalDelete(
		id?: number,
		modalTemplate: TemplateRef<any> = this.modalTemplateDelete,
		title?: string,
		status?: boolean,
	) {
		if (id !== undefined) {
			this.modalService.open(modalTemplate, { size: 'lg', title: title, status: status }).subscribe((action) => {
				console.log('modalAction', action);
				this.submit(id, modalTemplate, true);
			});
		}
	}
	//Chấp nhận xóa
	submit(id: number, modalTemplate: TemplateRef<any>, shape: boolean) {
		if (shape == true) {
			this.callDeleteCustomer(id, modalTemplate);
		} else {
			this.deleteSelectedCustomers(modalTemplate);
		}
	}
	selectedCustomers: ICustomer[] = [];
	// Xóa các item được checkbox tick
	openModalSelectDelete(
		modalTemplate: TemplateRef<any> = this.modalTemplateDelete,
		title?: string,
		status?: boolean,
	) {
		this.modalService.open(modalTemplate, { size: 'lg', title: title, status: status }).subscribe((action) => {
			console.log('modalAction', action);
			this.submit(0, modalTemplate, false);
		});
	}

	async deleteSelectedCustomers(modalTemplate: TemplateRef<any>) {
		const deletionObservables = this.customers.map((customer) => {
			if (customer.isChecked) this.deleteCustomer(customer.id);
		});
		await Promise.all(deletionObservables);

		setTimeout(() => {
			this.selectedCustomers = [];
			this.openModalNotification(modalTemplate, 'Tất cả khách hàng chọn đã được xóa', true);
			this.getCusomers();
			this.cdr.detectChanges();
		}, 2000);
	}
	deleteCustomer(id?: number, modalTemplate: TemplateRef<any> = this.modalTemplateDelete) {
		console.log(id);
		const params: ParamsID = { Id: id };
		this.customerService.detailCustomer(params).subscribe(
			(any) => {
				// Xử lý phản hồi thành công nếu cần
				this.openModalNotification(modalTemplate, 'Xóa khách hàng thành công', false);
				console.log('Delete customer success:', any);
			},
			(error) => {
				this.openModalNotification(modalTemplate, error.error.message, false);
				// Xử lý lỗi nếu có
				console.error('Delete staff error:', error);
			},
		);
	}
	//Xóa nhân viên
	callDeleteCustomer(staffid?: number, modalTemplate: TemplateRef<any> = this.modalTemplateDelete) {
		if (staffid === undefined) {
			console.error('Staff ID is undefined');
			return; // Exit the function if staffid is undefined
		}
		console.log(staffid);
		const params: ParamsID = { Id: staffid };
		this.customerService.detailCustomer(params).subscribe(
			(any) => {
				// Xử lý phản hồi thành công nếu cần
				this.getCusomers();
				this.openModalNotification(modalTemplate, 'Xin lỗi! Tính năng đang phát triển', false);
			},
			(error) => {
				// Xử lý lỗi nếu có
				console.error('Delete staff error:', error);
			},
		);
	}
	//Mở modal thông báo
	openModalNotification(modalTemplate: TemplateRef<any>, title: string, status: boolean) {
		this.modalServiceNotification
			.open(modalTemplate, { size: 'lg', title: title, status: status })
			.subscribe((action) => {
				console.log('modalAction', action);
			});
	}
	//Hàm bắt sự kiện chỉnh sửa và xóa trên bảng
	handleRowAction(eventData: { action: string; data: ICustomer }) {
		switch (eventData.action) {
			case 'update':
				console.log(eventData.data.id);
				this.openModalUpdate(this.modalTemplateUpdate, eventData.data.id);
				break;
			case 'delete':
				this.openModalDelete(
					eventData.data.id,
					(this.modalTemplateDelete = this.modalTemplateDelete),
					'Bạn chắc chắn muốn xóa chứ?',
					false,
				);
				break;
		}
	}
	// Thực hiện check tất cả các checkbox trong bảng
	toggleAllCheckboxes(event: any) {
		this.isChecked = event.target.checked;
		const updatedCustomers = this.customers.map((Customer) => {
			return { ...Customer, isChecked: this.isChecked };
		});
		this.customers = updatedCustomers;
		console.log(this.customers);
		this.cdr.detectChanges();
	}
	//Random button thêm tạo, tải,...button bắt sự kiện
	buttons = [
		// {
		//   svgContent: '../../../../../../assets/icons/plus_math.svg',
		//   valueButton: 'Tạo mới',
		//   valueClass:
		//     'border border-green-500 text-white bg-gradient-to-t from-green-500 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg  space-x-2 px-3 py-1 text-center me-2 mb-2',
		//   buttonClicked: () =>
		//     this.openCreateCustomerModalService(this.modalTemplateCreate),
		//   valueClassSvgContent: 'h-7 w-7',
		// },
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

	handleButtonClick(button: any) {
		if (typeof button.buttonClicked === 'function') {
			button.buttonClicked();
		} else {
			console.error('Invalid buttonClicked function.');
		}
	}
	//Khai báo cột của bảng
	columns: { title: string; key: keyof ICustomer }[] = [
		{ title: 'Họ và tên', key: 'name' },
		{ title: 'SĐT', key: 'phone' },
		{ title: 'Email', key: 'email' },
		{ title: 'Địa chỉ', key: 'address' },
		{ title: 'Giới tính', key: 'gender' },
		{ title: '', key: 'isChecked' },
	];
	handleCheckbox(item: ICustomer) {
		if (this.isChecked) {
			// Tìm customer trong danh sách customers
			const foundCustomer = this.customers.find((customer) => customer.id === item.id);

			if (foundCustomer) {
				// Tạo một bản sao của danh sách customers
				const updatedCustomers = this.customers.map((customer) => {
					if (customer.id === item.id) {
						// Nếu customer trùng với item, chỉnh sửa trường isCheck
						return { ...customer, isChecked: true };
					}
					return customer;
				});

				// Gán danh sách customers đã cập nhật
				this.customers = updatedCustomers;
			}
			this.isChecked = false;
		} else {
			// Tìm customer trong danh sách customers
			const foundCustomer = this.customers.find((customer) => customer.id === item.id);

			if (foundCustomer) {
				// Tạo một bản sao của danh sách customers
				const updatedCustomers = this.customers.map((customer) => {
					if (customer.id === item.id) {
						// Nếu customer trùng với item, chỉnh sửa trường isCheck
						return { ...customer, isChecked: false };
					}
					return customer;
				});

				// Gán danh sách customers đã cập nhật
				this.customers = updatedCustomers;
			}
			this.isChecked = true;
		}
	}
}
