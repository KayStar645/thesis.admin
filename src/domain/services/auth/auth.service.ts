// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;

//   login() {
//     localStorage.setItem('isLoggedIn', 'true');
//     this.loggedIn = true;
//   }

//   logout() {
//     localStorage.removeItem('isLoggedIn');
//     this.loggedIn = false;
//   }

//   isLoggedIn(): boolean {
//     return this.loggedIn;
//   }
// }
import { Injectable } from '@angular/core';
import { TokenData } from 'core/types/types';
import { jwtDecode } from 'jwt-decode';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor() {}

	setToken(token: string): void {
		localStorage.setItem('authToken', token);
	}

	getToken(): TokenData {
		const data = jwtDecode(localStorage.getItem('authToken')!) as TokenData;

		return data;
	}

	clearToken(): void {
		localStorage.removeItem('authToken');
	}

	isLoggedIn(): boolean {
		const token = localStorage.getItem('authToken');
		return !!token;
	}
}
