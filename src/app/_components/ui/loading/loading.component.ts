import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrl: './loading.component.scss',
})
export class LoadingComponent {
	@Input() show!: boolean;
	@Input() onTop: boolean = false;
}
