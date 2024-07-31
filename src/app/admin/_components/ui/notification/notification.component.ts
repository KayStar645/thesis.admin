import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrl: './notification.component.scss',
})
export class NotificationComponent {
	@Input() size? = 'md';
	@Input() title? = 'Modal title';
	@Input() status? = true;

	@Output() closeEvent = new EventEmitter();
	@Output() submitEvent = new EventEmitter();
	constructor(private elementRef: ElementRef) {
		setTimeout(() => {
			this.submit();
		}, 2000);
	}

	close(): void {
		this.elementRef.nativeElement.remove();
		this.closeEvent.emit();
	}

	submit(): void {
		this.elementRef.nativeElement.remove();
		this.submitEvent.emit();
	}
}
