export interface IEmployee {
	internalCode: string;
	name: string;
	dateOfBirth: string;
	gender: string;
	address: string;
	phoneNumber: string;
	email: string;
	avatar: string;
	idCard: string;
	positionId?: string;
	id: number;
	isChecked?: boolean;
	idCardImage: {
		front: string;
		back: string;
	};
}
