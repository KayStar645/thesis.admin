import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppFormModule } from 'app/_components/form/app-form.module';
import { AppUiComponentModule } from 'app/_components/ui/app-ui-component.module';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { AdminLayoutComponentModule } from '../_components/layout/admin-layout-component.module';

@NgModule({
	declarations: [],
	imports: [AppUiComponentModule, AppFormModule, AdminLayoutComponentModule, FormsModule],
	exports: [
		AppUiComponentModule,
		AppFormModule,
		AdminLayoutComponentModule,
		FormsModule,
		ReactiveFormsModule,
		SidebarModule,
		ToastModule,
		TableModule,
		RatingModule,
		TagModule,
	],
})
export class AdminSharedModule {}
