import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-button-image-component',
	templateUrl: './button.image.component.html',
})
export class ButtonImageComponent {
	@Input() valueClass: string = 'flex items-center';
	@Input() valueButton: string = 'flex items-center';
	@Input() svgContent: string | null = null;
	@Input() valueClick: string | null = null;
	@Input() valueDisabled: boolean | null = true;
	@Input() valueClassSvgContent: string = '';
	isChecked: boolean = false;

	@Output() buttonClicked = new EventEmitter<MouseEvent>();

	onClick(event: MouseEvent) {
		this.buttonClicked.emit(event);
	}
}
