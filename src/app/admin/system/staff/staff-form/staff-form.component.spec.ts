import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffFormComponent } from './staff-form.component';

describe('StaffFormComponent', () => {
	let component: StaffFormComponent;
	let fixture: ComponentFixture<StaffFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [StaffFormComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(StaffFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
