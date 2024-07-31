import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminSharedModule } from '../_modules/admin-shared.module';
import { PositionFormComponent } from './position/position-form/position-form.component';
import { PositionComponent } from './position/positon.component';
import { AssignRolePermissionComponent } from './role/assign-role-permission/assign-role-permission.component';
import { RoleComponent } from './role/role.component';
import { StaffFormComponent } from './staff/staff-form/staff-form.component';
import { StaffComponent } from './staff/staff.component';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
@NgModule({
	declarations: [
		SystemComponent,

		StaffComponent,
		StaffFormComponent,

		PositionComponent,
		PositionFormComponent,

		RoleComponent,
		AssignRolePermissionComponent,
	],
	imports: [CommonModule, SystemRoutingModule, AdminSharedModule],
})
export class SystemModule {}
