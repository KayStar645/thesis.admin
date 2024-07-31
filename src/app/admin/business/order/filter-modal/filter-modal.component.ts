import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { statusOrder } from 'config/status';
@Component({
	selector: 'app-filter-modal',
	templateUrl: './filter-modal.component.html',
	styles: ``,
})
export class FilterModalComponent {
	@Input() visible: boolean = false;
	@Output() visibleChange = new EventEmitter<boolean>();
	@Output() filterApplied = new EventEmitter<string>(); // Change to emit string

	filterForm: FormGroup;
	isLoading: boolean = false;
	statusOrderOptions = statusOrder;

	constructor(private fb: FormBuilder) {
		this.filterForm = this.fb.group({
			date: [null],
			phoneNumber: [''],
			needsApproval: ['-1'],
			minTotal: [''],
		});
	}

	closeModal() {
		this.visible = false;
		this.visibleChange.emit(this.visible);
	}

	applyFilter() {
		if (this.filterForm.valid) {
			const filterCriteria = this.generateFilterCriteria();
			console.log(filterCriteria);

			this.filterApplied.emit(filterCriteria); // Emit the generated filter criteria
			this.closeModal();
		}
	}

	private generateFilterCriteria(): string {
		const formValue = this.filterForm.value;
		let filterString = '';

		if (formValue.phoneNumber) {
			filterString += `customer.phone==${formValue.phoneNumber},`;
		}
		if (formValue.date) {
			const startDate = this.formatDate(new Date(formValue.date));
			const endDateObj = new Date(formValue.date);
			endDateObj.setDate(endDateObj.getDate() + 1);
			const endDate = this.formatDate(endDateObj);

			filterString += `date>=${startDate},date<=${endDate},`;
		}
		if (formValue.needsApproval && formValue.needsApproval !== '-1') {
			filterString += `status==${formValue.needsApproval},`;
		}

		// Remove trailing comma and space
		filterString = filterString.trim();
		if (filterString.endsWith(',')) {
			filterString = filterString.slice(0, -1);
		}

		return filterString;
	}
	private formatDate(date: Date): string {
		const d = new Date(date);
		const month = '' + (d.getMonth() + 1);
		const day = '' + d.getDate();
		const year = d.getFullYear();

		return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
	}
}
