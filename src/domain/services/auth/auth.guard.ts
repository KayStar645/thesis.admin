import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard {
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const authService = inject(AuthService);
		const router = inject(Router);

		return authService.isLoggedIn() ? true : router.navigate(['/auth/login']);
	}
}
