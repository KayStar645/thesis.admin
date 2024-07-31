import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OptionTpe } from 'core/types/types';
import { AuthService } from 'domain/services/auth/auth.service';

@Component({
	selector: 'app-menu-item',
	templateUrl: './menu-item.component.html',
	styles: ``,
})
export class MenuItemComponent implements OnInit {
	@Input({ required: true }) data!: OptionTpe;
	@Input({ required: true }) activeItem!: string;

	@Output() onClick = new EventEmitter<string>();

	collapse = false;

	constructor(private router: Router, private authService: AuthService) {}

	ngOnInit(): void {
		const authData = this.authService.getToken();

		if (this.data.permissions) {
			this.data.permissions.forEach((item) => {
				this.data.shouldShow = this.hasPermission(item, authData.permission);
			});
		}

		if (this.data.options) {
			this.data.shouldShow = this.data.options.some((option) => {
				const optionHasPermission =
					option.permissions?.filter((permission) => {
						return this.hasPermission(permission, authData.permission);
					}) || [];

				return optionHasPermission.length > 0 || option.shouldShow;
			});
		}
	}

	hasPermission(permission: string, permissions: string[]) {
		return permissions.includes(permission);
	}

	_onClick(event: Event) {
		const element = event.target as HTMLAnchorElement;

		this.collapse = !this.collapse;

		if (this.data.to) {
			this.onClick.emit(this.data.to);
		}
	}
}
