export interface IRoleWithController {
	name: string;
	permissions: string[];
}

export interface IRoleWithControllerCustom {
	name: string;
	permissionsShortcut: string[];
	permissions: {
		name: string;
		active: boolean;
	}[];
}
