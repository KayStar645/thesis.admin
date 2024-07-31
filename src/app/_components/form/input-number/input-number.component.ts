import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-input-number-component',
	templateUrl: './input-number.component.html',
})
export class InputNumberComponent implements OnChanges {
	@Input() label: string = '';
	@Input() value?: string | number = '';
	@Input() placeholder: string = '';
	@Input() required: boolean = false;
	@Input() errorMessage: string = '';
	@Input() inputClass: string = '';
	@Input() disabled: boolean = false;

	@Output() onChange = new EventEmitter<any>();

	formattedValue: string = '';

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && changes['value'].currentValue) {
			this.formattedValue = changes['value'].currentValue.toString().replace(/[^\d]/g, '');

			this.onChange.emit(changes['value'].currentValue.toString().replace(/[^\d]/g, ''));
		}
	}

	_onChange(event: Event) {
		const input = event.target as HTMLInputElement;

		input.value = input.value.replace(/[^\d]/g, '');
		this.formattedValue = input.value.replace(/[^\d]/g, '');

		this.onChange.emit(input.value);
	}
}
