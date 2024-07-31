// staff.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStatsOrderParams } from 'data/requests/stats/stats.request';
import {
	StatsOverview,
	IStats,
	IStatsOrder,
	StatsOrder,
	IStatsInventory,
	StatsInventory,
	IStatsSelling,
	StatsSelling,
	IStatsRevenue,
	StatsRevenue,
} from 'data/responses/stats/stats.reponses';
import { IStatsRepository } from 'domain/repositories/i-stats.reposity';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StatsRepository extends IStatsRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}

	override getOverview(): Observable<StatsOverview<IStats>> {
		return this.http.get<StatsOverview<IStats>>(`${this.apiUrl}/smw-api/statistical/overview`);
	}
	override getOrder(params: IStatsOrderParams): Observable<StatsOrder<IStatsOrder>> {
		const httpParams = new HttpParams()
			.set('IsYear', params.isYear)
			.set('Year', params.year)
			.set('Month', params.month);
		return this.http.get<StatsOrder<IStatsOrder>>(`${this.apiUrl}/smw-api/statistical/order`, {
			params: httpParams,
		});
	}
	override getInventory(): Observable<StatsInventory<IStatsInventory>> {
		return this.http.get<StatsInventory<IStatsInventory>>(`${this.apiUrl}/smw-api/statistical/inventory`);
	}
	override getSelling(params: IStatsOrderParams): Observable<StatsSelling<IStatsSelling>> {
		const httpParams = new HttpParams()
			.set('IsYear', params.isYear)
			.set('Year', params.year)
			.set('Month', params.month);
		return this.http.get<StatsSelling<IStatsSelling>>(`${this.apiUrl}/smw-api/statistical/selling`, {
			params: httpParams,
		});
	}
	override getRevenue(params: IStatsOrderParams): Observable<StatsRevenue<IStatsRevenue>> {
		const httpParams = new HttpParams()
			.set('IsYear', params.isYear)
			.set('Year', params.year)
			.set('Month', params.month);
		return this.http.get<StatsRevenue<IStatsRevenue>>(`${this.apiUrl}/smw-api/statistical/revenue`, {
			params: httpParams,
		});
	}
}
