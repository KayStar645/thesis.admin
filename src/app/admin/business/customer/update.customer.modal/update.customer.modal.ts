// staff.service.ts
import { DatePipe } from '@angular/common';
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef,
} from '@angular/core';
import { NotificationModalService } from 'app/admin/_components/ui/notification/services/notification.modal.service';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { ICustomer } from 'data/requests/customer/customer.request';
import { CustomerService } from 'domain/services/customer/customer.service';

@Component({
	selector: 'app-create-customer-modal',
	templateUrl: './update.customer.modal.html',
	providers: [],
})
export class UpdateCustomerModalComponent implements OnInit {
	@Output() closeEvent = new EventEmitter();
	@Output() submitEvent = new EventEmitter();
	idCustomer: number = 0;
	nameCustomer: string = '';
	genderCustomer: string = '';
	phoneCustomer: string = '';
	emailCustomer: string = '';
	addressCustomer: string = '';
	@Input() customer?: ICustomer;
	// Biến lỗi
	phoneErrorMessage: string;
	emailErrorMessage: string;
	idErrorMessage: string;
	nameErrorMessage: string;
	genderErrorMessage: string;
	addressErrorMessage: string;
	check: boolean;
	ngOnInit(): void {
		this.loadUpdate();
	}
	public breadcrumbs: IBreadcrumb[] = [];
	public breadcrumbService: BreadcrumbService;
	constructor(
		private elementRef: ElementRef,
		private cdr: ChangeDetectorRef,
		private Customerservice: CustomerService,
		breadcrumbService: BreadcrumbService,
		private datePipe: DatePipe,
		private modalNotificationService: NotificationModalService,
	) {
		this.idCustomer = 0;
		this.nameCustomer = '';
		this.genderCustomer = '';
		this.phoneCustomer = '';
		this.emailCustomer = '';
		this.addressCustomer = '';
		this.phoneErrorMessage = '';
		this.idErrorMessage = '';
		this.nameErrorMessage = '';
		this.genderErrorMessage = '';
		this.emailErrorMessage = '';
		this.addressErrorMessage = '';
		this.newCustomer;
		this.check = true;
		this.breadcrumbService = breadcrumbService;
	}

	getNameCustomerChange(value: string) {
		console.log(value);
		if (value.length < 3) {
			this.check = false;
			this.nameErrorMessage = 'Tên chưa hợp lệ! Phải lớn hơn hoặc bằng 3 kí tự';
		} else {
			this.check = true;
			this.nameCustomer = value;
			this.nameErrorMessage = '';
		}
		this.cdr.detectChanges();
	}
	onSelectChange(value: string) {
		console.log('Giá trị đã chọn:', this.genderCustomer);
		if (value.length == 0 || value == '') {
			this.genderErrorMessage = 'Giới tính còn trống';
		} else {
			this.check = true;
			this.genderCustomer = value;
			this.genderErrorMessage = '';
		}
		this.cdr.detectChanges();
	}
	selectedDate: Date = new Date('en-US');
	formattedDate: string | null = '';
	formatDate(date: Date): string {
		return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
	}

	getAddressCustomerChange(value: string) {
		console.log('địa chỉ: ' + this.addressCustomer);
		if (value.length == 0) {
			this.check = false;
			this.addressErrorMessage = 'Bạn cần nhập hơn hoặc bằng 3 kí tự';
		} else {
			this.check = true;
			this.addressCustomer = value;
			this.addressErrorMessage = '';
		}
		this.cdr.detectChanges();
	}
	getPhoneNumberCustomer(value: string) {
		console.log('Giá trị đã chọn:', value);
		const phoneRegex = /^\d{10}$/;
		if (!phoneRegex.test(value)) {
			this.check = false;
			this.phoneErrorMessage = 'Số điện thoại phải đủ 10 chữ số';
		} else {
			this.check = true;
			this.phoneCustomer = value;
			this.phoneErrorMessage = '';
		}
		this.cdr.detectChanges();
	}
	getEmailCustomer(value: string) {
		console.log('Giá trị đã chọn:', value);
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			this.check = false;
			this.emailErrorMessage = 'Địa chỉ email không hợp lệ';
		} else {
			this.check = true;
			this.emailCustomer = value;
			this.emailErrorMessage = '';
		}
		this.cdr.detectChanges();
	}

	newCustomer: ICustomer | null = {
		id: 0,
		name: '',
		gender: '',
		address: '',
		phone: '',
		email: '',
		isChecked: true,
	};
	close(): void {
		this.elementRef.nativeElement.remove();
		this.closeEvent.emit();
	}

	loadDataCustomer() {
		const dataCustomer: ICustomer = {
			id: this.idCustomer,
			name: this.nameCustomer,
			gender: this.genderCustomer,
			address: this.addressCustomer,
			phone: this.phoneCustomer,
			email: this.emailCustomer,
			isChecked: true,
		};
		this.newCustomer = dataCustomer;
		this.cdr.detectChanges();
	}
	openModalNotification(modalTemplate: TemplateRef<any>, title: string, status: boolean) {
		this.modalNotificationService
			.open(modalTemplate, { size: 'lg', title: title, status: status })
			.subscribe((action) => {
				console.log('modalAction', action);
			});
	}
	submit(): void {}
	succeeded?: boolean = true;
	async onSubmit(modalTemplate: TemplateRef<any>) {
		if (this.checkForm()) {
			if (this.check) {
				if (this.newCustomer !== null) {
					this.loadDataCustomer();
					console.log(this.newCustomer);
					this.Customerservice.updateCustomer(this.newCustomer).subscribe(
						(result) => {
							if (this.newCustomer !== null) {
								this.newCustomer = result.data || null;
								console.log(result.messages);
								this.succeeded = result.succeeded;
								this.cdr.detectChanges();
								if (this.succeeded) {
									console.log('Khách hàng được cập nhật thành công');
									this.elementRef.nativeElement.remove();
									this.submitEvent.emit();
									this.openModalNotification(modalTemplate, 'Cập nhật thành công', true);
								}
							}
						},
						(error) => {
							console.error(error.message);
							this.openModalNotification(modalTemplate, error.error.message, false);
						},
					);
				}
			}
		}
	}
	checkForm() {
		const message = 'Vui lòng nhập vào đây';
		let check = true;
		if (this.nameCustomer.length == 0) {
			this.nameErrorMessage = message;
			check = false;
		}
		if (this.addressCustomer.length <= 1) {
			this.addressErrorMessage = message;
			check = false;
		}
		if (this.genderCustomer.length <= 1) {
			this.genderErrorMessage = message;
			check = false;
		}
		if (this.phoneCustomer.length <= 1) {
			this.phoneErrorMessage = message;
			check = false;
		}
		if (this.idCustomer == 0) {
			this.idErrorMessage = message;
			check = false;
		}
		if (this.emailCustomer.length <= 1) {
			this.emailErrorMessage = message;
			check = false;
		}
		this.cdr.detectChanges();
		if (check) {
			return true;
		}
		return false;
	}
	loadUpdate() {
		this.idCustomer = this.customer?.id || 0;
		this.addressCustomer = this.customer?.address || '';
		this.emailCustomer = this.customer?.email || '';
		this.phoneCustomer = this.customer?.phone || '';
		this.genderCustomer = this.customer?.gender || 'Nữ';
		this.nameCustomer = this.customer?.name || '';
	}
}
