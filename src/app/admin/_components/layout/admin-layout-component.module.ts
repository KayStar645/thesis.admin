import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
	declarations: [
		BannerComponent,
		FooterComponent,
		HeaderComponent,
		NavbarComponent,
		SlidebarComponent,
		MenuItemComponent,
		MenuComponent,
	],
	imports: [CommonModule, RouterModule],
	exports: [BannerComponent, FooterComponent, HeaderComponent, NavbarComponent, SlidebarComponent],
})
export class AdminLayoutComponentModule {}
