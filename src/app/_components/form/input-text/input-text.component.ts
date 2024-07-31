import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-input-text-component',
	templateUrl: './input-text.component.html',
})
export class InputTextComponent implements OnChanges {
	@Input() label: string = '';
	@Input() value?: string = '';
	@Input() placeholder: string = '';
	@Input() required: boolean = false;
	@Input() errorMessage: string = '';
	@Input() disabled: boolean = false;

	@Output() onChange = new EventEmitter<string>();

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && changes['value'].currentValue) {
			this.onChange.emit(changes['value'].currentValue);
		}
	}

	_onChange(event: Event) {
		const inputValue = (event.target as HTMLInputElement).value;

		this.onChange.emit(inputValue);
	}
}
