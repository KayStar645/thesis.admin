import { NgModule } from '@angular/core';
import { mapToCanActivate, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'domain/services/auth/auth.guard';
import { LoginGuard } from 'domain/services/auth/login.guard';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'auth/login',
	},
	{
		path: 'admin',
		loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
		canActivate: mapToCanActivate([AuthGuard]),
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
		canActivate: mapToCanActivate([LoginGuard]),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
