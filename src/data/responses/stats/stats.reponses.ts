import { Result, ResultList } from 'core/types/types';

export interface IStats {
	itemTotal: number;
	customerTotal: number;
	outStock: number;
	orderTotal: number;
}
export interface IStatsOrder {
	time: number;
	orderCount: number;
}
export interface IStatsInventory {
	id: string;
	parent: string;
	name: string;
	value?: number;
}
export interface IStatsSelling {
	number: string;
	name: string;
	value?: number;
}
export interface IStatsRevenue {
	time: number;
	revenue: number;
}
export interface StatsOverview<IStats> extends Result<IStats> {}
export interface StatsOrder<IStatsOrder> extends ResultList<IStatsOrder> {}
export interface StatsInventory<IStatsInventory> extends ResultList<IStatsInventory> {}
export interface StatsSelling<IStatsSelling> extends ResultList<IStatsSelling> {}
export interface StatsRevenue<IStatsRevenue> extends ResultList<IStatsRevenue> {}
