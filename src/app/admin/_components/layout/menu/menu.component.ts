import { Component, signal } from '@angular/core';
import { menu } from 'config/menu';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styles: ``,
})
export class MenuComponent {
	menu = menu;
	active = signal('/admin/master-data/category');

	onMenuItemClick(event: string) {
		this.active.set(event);

		console.log(event);
	}
}
