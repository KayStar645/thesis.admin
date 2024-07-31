import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionFormComponent } from './position/position-form/position-form.component';
import { PositionComponent } from './position/positon.component';
import { RoleComponent } from './role/role.component';
import { StaffFormComponent } from './staff/staff-form/staff-form.component';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'staff',
	},
	{
		path: 'staff',
		component: StaffComponent,
	},
	{
		path: 'staff/form',
		component: StaffFormComponent,
	},
	{
		path: 'position',
		component: PositionComponent,
	},
	{
		path: 'position/form',
		component: PositionFormComponent,
	},
	{
		path: 'role',
		component: RoleComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SystemRoutingModule {}
