import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-input-price-component',
	templateUrl: './input-price.component.html',
})
export class InputPriceComponent implements OnChanges {
	@Input() label: string = '';
	@Input() value?: string | number = '';
	@Input() placeholder: string = '';
	@Input() required: boolean = false;
	@Input() errorMessage: string = '';
	@Input() inputClass: string = '';
	@Input() disabled: boolean = false;

	@Output() onChange = new EventEmitter<number>();

	formattedValue: string = '';

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && changes['value'].currentValue) {
			this.formattedValue = parseInt(changes['value'].currentValue).toLocaleString('vi-VN');

			this.onChange.emit(parseInt(changes['value'].currentValue.toString().replace(/[^\d]/g, '')));
		}
	}

	_onChange(event: Event) {
		const input = event.target as HTMLInputElement;

		input.value = input.value.replace(/[^\d]/g, '');

		if (input.value) {
			input.value = parseInt(input.value).toLocaleString('vi-VN');

			this.formattedValue = input.value;

			this.onChange.emit(parseInt(input.value.replace(/[^\d]/g, '')));
		}
	}
}
