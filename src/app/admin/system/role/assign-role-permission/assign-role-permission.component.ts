import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { queryKey } from 'config/query-key';
import { IRoleWithControllerCustom } from 'data/requests/role/role-with-controller.request';
import { IRole } from 'data/requests/role/role.request';
import { RoleService } from 'domain/services/role/role.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';

@Component({
	selector: 'app-assign-role-permission',
	templateUrl: './assign-role-permission.component.html',
	styleUrl: './assign-role-permission.component.scss',
})
export class AssignRolePermissionComponent implements OnInit {
	@Input({ required: true }) roleId!: number;

	@Output() onSuccess = new EventEmitter();

	public checked = true;
	public role: IRole = {
		id: 0,
		isChecked: false,
		name: '',
		permissions: [],
	};
	public permissions: IRoleWithControllerCustom[] = [];
	public queryClient = injectQueryClient();

	public roleUpdateMutate = injectMutation(() => ({
		mutationFn: () => {
			return lastValueFrom(this.roleService.updateRole(this.role));
		},
		onSuccess: (data) => {
			this.onSuccess.emit();

			this.toast.success('Cập nhật vai trò thành công');
		},
		onError: (err) => {
			this.toast.error(err.message);
		},
	}));

	public roleDetailQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		enabled: this.roleId > 0,
		queryKey: queryKey.role.detail(this.roleId),
		gcTime: 0,
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return this.roleService
				.detailRole({ Id: this.roleId })
				.pipe(takeUntil(abort$))
				.subscribe({
					next: (value) => {
						if (value.data) {
							this.role = value.data;
						}
					},
					error: (err) => {
						this.toast.error(err.error?.messages?.[0] || err.message);
					},
				});
		},
	}));

	public roleQuery = injectQuery(() => ({
		refetchOnWindowFocus: false,
		enabled: this.roleDetailQuery.isSuccess() || this.roleId === 0,
		gcTime: 0,
		queryKey: queryKey.role.listRoleWithController(),
		queryFn: async (context) => {
			const abort$ = fromEvent(context.signal, 'abort');

			return this.roleService
				.roleWithController()
				.pipe(takeUntil(abort$))
				.subscribe({
					next: (value) => {
						if (value.data) {
							this.permissions = value.data.map((t) => {
								const actives = t.permissions.map((j) => ({
									name: j,
									active: this.role.permissions
										? this.role.permissions.findIndex((rolePermission) => {
												const split = rolePermission.split('.');

												return split[0] === t.name && split[1] === j;
										  }) > -1
										: false,
								}));

								return {
									name: t.name,
									permissionsShortcut: actives
										.filter((t, index) => index < 4 && t.active)
										.map((t) => t.name),
									permissions: actives,
								};
							});
						}
					},
					error: (err) => {
						this.toast.error(err.error?.messages?.[0] || err.message);
					},
				});
		},
	}));

	public roleAddMutate = injectMutation(() => ({
		mutationFn: () => {
			return lastValueFrom(this.roleService.addRole(this.role));
		},
		onSuccess: (data) => {
			this.onSuccess.emit();

			this.toast.success('Thêm vai trò thành công');
		},
		onError: (err: any) => {
			this.toast.error(err.error.messages[0] || err.message);
		},
	}));

	constructor(private roleService: RoleService, private toast: ToastrService) {}

	ngOnInit() {}

	onCheck(
		permission: IRoleWithControllerCustom,
		permissionItem: { name: string; active: boolean },
		checked: boolean,
	) {
		const foundIndex = this.permissions.findIndex((t) => t.name === permission.name);

		if (checked) {
			this.permissions[foundIndex].permissionsShortcut.push(permissionItem.name);
		}

		if (!checked) {
			const foundPermissionShortcutIndex = this.permissions[foundIndex].permissionsShortcut.findIndex(
				(t) => t === permissionItem.name,
			);

			this.permissions[foundIndex].permissionsShortcut.splice(foundPermissionShortcutIndex, 1);
		}

		if (this.permissions.length > 4) {
			this.permissions[foundIndex].permissionsShortcut.splice(4);
		}
	}

	onSave() {
		const permissions = this.permissions
			.map((permission) => {
				const actives = permission.permissions.filter((t) => t.active).map((t) => t.name);

				return actives.map((t) => `${permission.name}.${t}`);
			})
			.flat();

		this.role.permissions = permissions;

		if (this.role.id === 0) {
			this.roleAddMutate.mutate();
		}

		if (this.role.id > 0) {
			this.roleUpdateMutate.mutate();
		}
	}
}
