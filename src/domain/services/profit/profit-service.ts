import { Injectable } from '@angular/core';
import { ProfitRepository } from 'data/datasources/remote/repo-implementations/profit/profit-repository';
import { ProfitDetailResponse } from 'data/responses/profit/profit-detail-response';
import { ListProfitResponse } from 'data/responses/profit/profit-response';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProfitService {
	constructor(private profitRepository: ProfitRepository) {}

	getProfit(params: { pMinUtil: number; pMonth: number; pYear: number }): Observable<ListProfitResponse> {
		return this.profitRepository.getProfit(params);
	}

	getProfitDetail(id: number): Observable<ProfitDetailResponse> {
		return this.profitRepository.getProfitDetail(id);
	}
}
