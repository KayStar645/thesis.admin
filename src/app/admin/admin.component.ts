import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'domain/services/auth/auth.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
	constructor(private router: Router, private authService: AuthService) {}

	onDateChange(date: any) {}

	ngOnInit() {}
}
