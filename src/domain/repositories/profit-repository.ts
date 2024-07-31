import { Injectable } from '@angular/core';
import { ProfitDetailResponse } from 'data/responses/profit/profit-detail-response';
import { ListProfitResponse } from 'data/responses/profit/profit-response';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class IProfitRepository {
	abstract getProfit(params: { pMinUtil: number }): Observable<ListProfitResponse>;

	abstract getProfitDetail(id: number): Observable<ProfitDetailResponse>;
}
