import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

@Component({
	selector: 'app-generic-table-component',
	templateUrl: './generic.table.component.html',
})
export class GenericTableComponent<T> implements OnChanges {
	@Input() customCol: boolean = false;
	@Input() data: any[] = [];
	@Input() dataSelect: { id: string; name: string }[] = [];
	@Input() columns: { title: string; key: keyof T; name?: string }[] = [];
	@Input() currentPage?: number = 1;
	@Input() pageSize: number = 10;
	@Input() totalCount?: number = 10;
	@Input() isInputText: boolean = false;
	@Input() labelInputNumber: string = '';
	@Input() labelInputPrice: string = '';
	@Input() valueInput: string = '';
	@Input() removeDelete: boolean = false;
	@Input() removeEdit: boolean = false;
	@Input() isShowEditRemove: boolean = true;
	@Input() isShowAllDelete: boolean = false;
	@Input() isShowCheckBox: boolean = true;
	@Input() isCheckBox: boolean = true;
	@Input() isRadio: boolean = false;
	@Input() isShowUpdate: boolean = false;
	@Input() shouldPagination: boolean = true;
	@Input() labelStatus: string = '';

	@Input() customColumns: {
		title: string;
		getter: (item: T) => any;
		name?: string;
		class?: string;
	}[] = [];

	@Output() pageChange = new EventEmitter<number>();
	@Output() tickAllCheckboxes = new EventEmitter<Event>();
	@Output() tickCheckboxes = new EventEmitter<T>();
	@Output() openModalSelectDelete = new EventEmitter();
	@Output() openModalSelectUpdate = new EventEmitter();
	@Output() getValueNumber = new EventEmitter();
	@Output() getValuePrice = new EventEmitter();
	@Output() getValueID = new EventEmitter();

	@Output() rowAction: EventEmitter<{ action: string; data: T; event: MouseEvent }> = new EventEmitter<{
		action: string;
		data: T;
		event: MouseEvent;
	}>();

	columnIndexes: number[];
	first: number = 0;
	rows: number = 10;

	actions = [
		{
			name: 'update',
			icon: '../../../../assets/icons/Edit.svg',
		},
		{
			name: 'delete',
			icon: '../../../../assets/icons/Trash.svg',
		},
	];

	constructor() {
		this.columnIndexes = Array.from(Array(this.columns.length).keys());
	}

	ngOnChanges(changes: SimpleChanges): void {}

	// Các phương thức xử lý sự kiện
	handleRowAction(action: string, data: T, event: MouseEvent) {
		this.rowAction.emit({ action, data, event });
	}

	handleChangeInputNumber(value: string) {
		this.getValueNumber.emit(value);
	}

	handleChangeInputID(value: string) {
		this.getValueID.emit(value);
	}

	handleChangeInputPrice(value: string) {
		this.getValuePrice.emit(value);
	}

	handlePageChange(data: PaginatorState) {
		if (data?.page !== undefined) {
			this.pageChange.emit(data?.page + 1);
		}

		if (data.first !== undefined) {
			this.first = data.first;
		}
	}

	handleButtonClick(button: any) {
		if (typeof button.buttonClicked === 'function') {
			button.buttonClicked();
		} else {
			console.error('Invalid buttonClicked function.');
		}
	}

	openModalSelect(data: string) {
		switch (data) {
			case 'Xóa tất cả':
				this.openModalSelectDelete.emit();
				break;
			case 'Duyệt':
				this.openModalSelectUpdate.emit();
				break;
		}
	}

	toggleCheckboxes(event: Event) {
		this.tickAllCheckboxes.emit(event);
	}

	handleChangeCheck($event: Event, item: any) {
		const input = $event.target as HTMLInputElement;

		item.isChecked = input.checked;
		this.tickCheckboxes.emit(item);
	}

	onPageChange(pageNumber: PaginatorState) {
		if (pageNumber.page) {
			this.pageChange.emit(pageNumber.page + 1);
		}

		this.first = pageNumber.first || 0;
	}
}
