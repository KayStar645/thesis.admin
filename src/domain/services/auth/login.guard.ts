import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { DEFAULT_REDIRECT } from 'config/menu';

@Injectable({
	providedIn: 'root',
})
export class LoginGuard {
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const authService = inject(AuthService);
		const router = inject(Router);

		console.log('login-guard work');

		return authService.isLoggedIn() ? router.navigate([DEFAULT_REDIRECT]) : true;
	}
}
