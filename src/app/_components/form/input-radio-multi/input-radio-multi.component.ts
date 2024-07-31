import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-input-radio-multi',
	templateUrl: './input-radio-multi.component.html',
	styles: ``,
})
export class InputRadioMultiComponent implements OnInit {
	@Input({ required: true }) name: string = '';
	@Input({ required: true }) options: any[] = [];
	@Input() valueField: string = 'value';
	@Input() labelField: string = 'label';
	@Input() label: string = '';
	@Input() value?: string | number = '';
	@Input() required: boolean = false;
	@Input() errorMessage: string = '';
	@Input() disabled: boolean = false;
	@Input() layout: string = '4';

	@Output() onChange = new EventEmitter<any>();

	formattedValue?: string | number = '';

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		if (
			changes['value'] &&
			(changes['value'].currentValue ||
				(typeof changes['value'].currentValue === 'number' && changes['value'].currentValue > -1)) &&
			changes['value'].firstChange
		) {
			const found = this.options.find((t) => t[this.valueField] === changes['value'].currentValue);

			this.onChange.emit(found);

			this.formattedValue = found[this.valueField];
		}
	}

	_onChange(event: any) {
		this.onChange.emit(event);

		this.formattedValue = event[this.valueField];
	}
}
