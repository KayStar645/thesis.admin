import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import {
	IStats,
	IStatsInventory,
	IStatsOrder,
	IStatsRevenue,
	IStatsSelling,
	StatsInventory,
	StatsOrder,
	StatsOverview,
	StatsRevenue,
	StatsSelling,
} from 'data/responses/stats/stats.reponses';
import { IStatsOrderParams } from 'data/requests/stats/stats.request';

@Injectable({ providedIn: 'root' })
export abstract class IStatsRepository {
	abstract getOverview(): Observable<StatsOverview<IStats>>;
	abstract getOrder(params: IStatsOrderParams): Observable<StatsOrder<IStatsOrder>>;
	abstract getInventory(): Observable<StatsInventory<IStatsInventory>>;
	abstract getSelling(params: IStatsOrderParams): Observable<StatsSelling<IStatsSelling>>;
	abstract getRevenue(params: IStatsOrderParams): Observable<StatsRevenue<IStatsRevenue>>;
}
