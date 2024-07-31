import { Component, OnInit } from '@angular/core';
import { AuthService } from 'domain/services/auth/auth.service';

@Component({
	selector: 'app-navbar-component',
	templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
	constructor(private authService: AuthService) {}

	userName = '';

	ngOnInit() {
		this.userName = this.authService.getToken().userName;
	}

	logout() {
		localStorage.clear();
	}
}
