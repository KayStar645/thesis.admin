// staff.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfitDetailResponse } from 'data/responses/profit/profit-detail-response';
import { ListProfitResponse } from 'data/responses/profit/profit-response';
import { IProfitRepository } from 'domain/repositories/profit-repository';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProfitRepository extends IProfitRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}

	override getProfit(params: { pMinUtil: number; pMonth: number; pYear: number }): Observable<ListProfitResponse> {
		return this.http.get<ListProfitResponse>(`${this.apiUrl}/smw-api/clhui`, {
			params,
		});
	}

	override getProfitDetail(id: number): Observable<ProfitDetailResponse> {
		return this.http.get<ProfitDetailResponse>(`${this.apiUrl}/smw-api/clhui/detail`, {
			params: {
				id,
			},
		});
	}
}
