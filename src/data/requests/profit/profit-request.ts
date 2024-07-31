export interface IProfit {
	id: number;
	items: IProfitItem[];
	profit: number;
}

export interface IProfitItem {
	id: number;
	internalCode: string;
	name: string;
	isCategory: boolean;
	items?: IProfitItem[];
}
