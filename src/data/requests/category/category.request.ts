export interface ICategory {
	internalCode: string;
	name: string;
	parentId: number;
	parent?: ICategory;
	id: number;
	isChecked?: boolean;
	icon: string;
}
