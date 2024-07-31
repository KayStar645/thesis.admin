import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-input-select',
	templateUrl: './input-select.component.html',
	styles: ``,
})
export class InputSelectComponent implements OnChanges {
	@Input({ required: true }) options: any[] = [];
	@Input() labelField: string = 'label';
	@Input() valueField: string = 'value';
	@Input() required: boolean = false;
	@Input() value?: string = '';
	@Input() placeholder: string = '';
	@Input() label: string = '';
	@Input() errorMessage: string = '';

	@Output() onChange = new EventEmitter<string>();

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && changes['value'].currentValue) {
			this.value = this.options.find((t) => t[this.valueField] === this.value)[this.labelField];

			this.onChange.emit(changes['value'].currentValue);
		}
	}

	_onChange(event: any) {
		this.onChange.emit(event.value);
	}
}
