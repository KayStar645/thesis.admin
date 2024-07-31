import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AppUiComponentModule } from 'app/_components/ui/app-ui-component.module';

@NgModule({
	declarations: [AuthComponent, LoginComponent],
	imports: [CommonModule, AuthRoutingModule, FormsModule, AppUiComponentModule],
})
export class AuthModule {}
