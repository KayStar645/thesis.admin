import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-button-component',
	templateUrl: './button.component.html',
})
export class ButtonComponent {
	@Input() valueClass: string = 'flex items-center';
	@Input() valueClick: string | null = null;
	@Input() valueButtonText: string | null = null;
	@Output() buttonClicked = new EventEmitter();
	onSubmit() {
		this.buttonClicked.emit();
	}
}
