import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProfitItem } from 'data/requests/profit/profit-request';

@Component({
	selector: 'app-profit-item',
	templateUrl: './profit-item.component.html',
	styles: ``,
})
export class ProfitItemComponent {
	@Input() data!: IProfitItem;

	constructor(private router: Router) {}

	onClick() {
		if (!this.data.items) {
			this.router.navigate(['admin/master-data/product/form'], {
				queryParams: {
					id: this.data.id,
				},
			});
		}
	}
}
