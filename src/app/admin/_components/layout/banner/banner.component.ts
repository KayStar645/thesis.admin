import { Component, OnInit, Input } from '@angular/core';
import { IBreadcrumb } from 'app/admin/_services/breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from 'app/admin/_services/breadcrumbs/breadcrumbs.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-banner-component',
	templateUrl: './banner.component.html',
	providers: [BreadcrumbService],
})
export class BannerComponent implements OnInit {
	@Input() breadcrumbs: IBreadcrumb[] = [];
	breadcrumbs$: Observable<IBreadcrumb[]>;
	public breadcrumbService: BreadcrumbService;
	today = new Date();
	ngOnInit() {
		this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
	}
	//Hàm khởi tạo
	constructor(breadcrumbService: BreadcrumbService) {
		this.breadcrumbService = breadcrumbService;
		this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
	}
}
