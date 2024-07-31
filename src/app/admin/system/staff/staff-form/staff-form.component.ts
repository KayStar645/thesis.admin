import { DatePipe } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { AppFormService } from 'app/_components/form/app-form.service';
import { queryKey } from 'config/query-key';
import { IEmployee } from 'data/requests/staff/employees.request';
import { IPosition } from 'data/requests/position/position.request';
import { format } from 'date-fns';
import { EmployeeService } from 'domain/services/staff/employee.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { object, string } from 'yup';

@Component({
	selector: 'app-staff-form',
	templateUrl: './staff-form.component.html',
	styles: ``,
})
export class StaffFormComponent implements OnInit {
	id: WritableSignal<number> = signal(-1);

	formSchema = object({
		name: string().required(),
		internalCode: string().required(),
		dateOfBirth: string().required(),
		gender: string().required(),
		email: string().required(),
		address: string().required(),
		phoneNumber: string().required(),
		positionId: string().required(),
		idCard: string().required(),
		avatar: string().optional(),
	});

	detailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		queryKey: [queryKey.staff.detail(this.id())],
		enabled: this.id() != 0,
		queryFn: (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return lastValueFrom(this.staffService.detailEmployee({ Id: this.id() }).pipe(takeUntil(abort$)));
		},
	}));

	positionColumns: {
		title: string;
		getter: (item: IPosition) => void;
		name?: string;
		class?: string;
	}[] = [
		{ title: 'Mã chức vụ', getter: (item: IPosition) => item['internalCode'] },
		{ title: 'Tên chức vụ', getter: (item: IPosition) => item['name'] },
		{ title: '', getter: (item: IPosition) => item['isChecked'] },
	];

	addMutate = injectMutation(() => ({
		mutationFn: (data: IEmployee) => {
			return lastValueFrom(this.staffService.addEmployee(data));
		},
		onSuccess: (data) => {
			this.toast.success('Thêm nhân viên thành công');
			this.router.navigate(['admin/system/staff']);
		},
		onError: (error: any) => {
			this.toast.error(error.error.messages[0] || error.message);
		},
	}));

	updateMutate = injectMutation(() => ({
		mutationFn: (data: IEmployee) => {
			return lastValueFrom(this.staffService.updateEmployee(data));
		},
		onSuccess: (data) => {
			this.toast.success('Cập nhật nhân viên thành công');
			this.router.navigate(['admin/system/staff']);
		},
		onError: (error: any) => {
			this.toast.error(error.error.messages[0] || error.message);
		},
	}));

	form = {
		idCardImage: {
			back: '',
			front: '',
		},
	} as IEmployee;

	errors: WritableSignal<{ [key: string]: string }> = signal({});

	constructor(
		private staffService: EmployeeService,
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

	ngOnInit(): void {}

	formatDate(date: string): string {
		const newDate = new Date(date);
		const datePipe = new DatePipe('en-US');
		return datePipe.transform(newDate, 'dd/MM/yyyy') || '';
	}

	async onSubmit() {
		const result = await this.formService.validate<IEmployee>(this.formSchema, this.form);

		if (result.message) {
			this.errors.set(result.message);
		}

		if (result.valid && result.data) {
			if (this.id() > 0) {
				this.updateMutate.mutate({
					...result.data,
					dateOfBirth:
						format(result.data.dateOfBirth, 'yyyy-MM-dd') +
						'T' +
						format(result.data.dateOfBirth, 'HH:mm:ss') +
						'.000Z',
				});

				return;
			}
			this.addMutate.mutate({
				...result.data,
				dateOfBirth:
					format(result.data.dateOfBirth, 'yyyy-MM-dd') +
					'T' +
					format(result.data.dateOfBirth, 'HH:mm:ss') +
					'.000Z',
			});

			return;
		}
	}
}
