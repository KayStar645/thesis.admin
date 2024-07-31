import { Component, EventEmitter, Input, Output, signal, SimpleChanges, WritableSignal } from '@angular/core';

@Component({
	selector: 'app-input-dialog-select-draw-multi',
	templateUrl: './input-dialog-select-draw-multi.component.html',
	styles: ``,
})
export class InputDialogSelectDrawMultiComponent {
	@Input({ required: true }) columns: any[] = [];
	@Input({ required: true }) dialogHeader: string = '';
	@Input({ required: true }) valueField: string = '';
	@Input({ required: true }) labelField: string = '';
	@Input() label: string = '';
	@Input() value: any[] = [];
	@Input() data: any[] = [];
	@Input() placeholder: string = '';
	@Input() required: boolean = false;
	@Input() errorMessage: string = '';
	@Input() disabled: boolean = false;
	@Input() dataDisplay: 'table' | 'inbox' = 'inbox';

	@Output() onChange = new EventEmitter<any[]>();

	visible = false;
	loading = false;
	selected: any[] = [];

	formattedValue: WritableSignal<any[]> = signal([]);

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		this.formatValue();
	}

	formatValue() {
		const result: any[] = [];

		this.value.forEach((item) => {
			const foundIndex = this.data?.findIndex((t) => t[this.valueField] === (item[this.valueField] || item));

			if (foundIndex > -1) {
				this.data[foundIndex].isChecked = true;

				result?.push(this.data[foundIndex]);
			}
		});

		this.selected = result;
		this.formattedValue.set(result);

		this.onChange.emit(result);
	}

	_onChange() {
		this.formattedValue.set(this.selected);

		this.onChange.emit(this.selected);

		this.visible = false;
	}

	onSelect(event: any) {
		const foundIndex = this.selected.findIndex((t) => t[this.valueField] === event[this.valueField]);

		if (foundIndex === undefined || foundIndex === -1) {
			this.selected = [...this.selected, event];
			return;
		}

		this.selected = this.selected.filter((t, i) => i !== foundIndex);
	}

	onOpen() {
		if (!this.disabled) {
			this.visible = true;
		}
	}
}
