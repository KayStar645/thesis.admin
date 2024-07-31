import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonImageComponent } from './button-image/button.image.component';
import { LoadingComponent } from './loading/loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { ChipModule } from 'primeng/chip';

@NgModule({
	declarations: [ButtonComponent, ButtonImageComponent, LoadingComponent],
	imports: [CommonModule, ProgressSpinnerModule, PaginatorModule, ChipModule],
	exports: [ButtonComponent, ButtonImageComponent, LoadingComponent, PaginatorModule, ChipModule],
})
export class AppUiComponentModule {}
