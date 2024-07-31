import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Import of từ rxjs
import { StatsRepository } from 'data/datasources/remote/repo-implementations/stats/stats.repository';
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

@Injectable({
	providedIn: 'root',
})
export class StatsService {
	constructor(private statsRepository: StatsRepository) {}

	getOverview(): Observable<StatsOverview<IStats>> {
		return this.statsRepository.getOverview();
	}

	getOrder(param: IStatsOrderParams): Observable<StatsOrder<IStatsOrder>> {
		return this.statsRepository.getOrder(param);
	}
	getInventory(): Observable<StatsInventory<IStatsInventory>> {
		return this.statsRepository.getInventory();
	}
	getSelling(param: IStatsOrderParams): Observable<StatsSelling<IStatsSelling>> {
		return this.statsRepository.getSelling(param);
	}
	getRevenue(param: IStatsOrderParams): Observable<StatsRevenue<IStatsRevenue>> {
		return this.statsRepository.getRevenue(param);
	}
}
