import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-inputDateTime-component',

	templateUrl: './inputdatetime.component.html',
})
export class InputDateTimeComponent {
	@Input() labelTime: string = '';
	@Input() valueClass: string = '';
	@Input() name: string = '';
	@Input() value: string = '';
	@Output() valueChangeDateTime = new EventEmitter<String>();
	@Input() required: boolean = false;
	onChange(event: Event) {
		const inputValue = (event.target as HTMLInputElement).value;
		console.log(inputValue);
		this.valueChangeDateTime.emit(inputValue);
	}
	@Output() warningFocusOut = new EventEmitter<string>();
	handleValueFocusOut() {
		console.log('vào hàm này rồi handleValueFocusOut');
		this.warningFocusOut.emit();
	}
}
