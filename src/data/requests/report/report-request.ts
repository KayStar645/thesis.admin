export interface IReport {
	rows: IRowItem[];
	companyName: string;
	name: string;
	time: string;
	address: string;
	revenue: number;
	expense: number;
	profit: number;
	createBy: string;
}

export interface IReportPromotion {
	rows: IRowPromotionItem[];
	companyName: string;
	name: string;
	time: string;
	address: string;
	revenue: number;
	expense: number;
	profit: number;
	createBy: string;
}

export interface IRowItem {
	id: number;
	items: Item[];
	groupProfits: number;
}

export interface IRowPromotionItem {
	id: number;
	names: string[];
	sellNumber: number;
	revenue: number;
	expense: number;
	profit: number;
}

export interface Item {
	name: string;
	sellNumber: number;
	revenue: number;
	expense: number;
	profit: number;
	rowSpan: number;
	isCategory: boolean;
}
