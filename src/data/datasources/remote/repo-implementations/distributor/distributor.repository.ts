// staff.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDistributorRepository } from 'domain/repositories/idistributor.reposity';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IDistributor } from 'data/requests/distributor/distributor.request';
import { CreateDistributorResponse } from 'data/responses/distributor/create.distributor.reponses';
import { DetailDistributorResponse } from 'data/responses/distributor/detail.distributor.reponses';
import { ListDistributorResponse } from 'data/responses/distributor/distributor.reponses';
import { UpdateDistributorResponse } from 'data/responses/distributor/update.distributor.reponses';
import { environment } from 'environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class DistributorRepository extends IDistributorRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}
	override getDistributors(params: RequestParams): Observable<ListDistributorResponse<IDistributor>> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page)
			.set('PageSize', params.pageSize)
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListDistributorResponse<IDistributor>>(`${this.apiUrl}/smw-api/distributor`, {
			params: httpParams,
		});
	}

	override updateDistributor(params: IDistributor): Observable<UpdateDistributorResponse<IDistributor>> {
		return this.http.put<UpdateDistributorResponse<IDistributor>>(`${this.apiUrl}/smw-api/distributor`, params);
	}

	override detailDistributor(params: ParamsID): Observable<DetailDistributorResponse<IDistributor>> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);
		return this.http.get<DetailDistributorResponse<IDistributor>>(`${this.apiUrl}/smw-api/distributor/detail`, {
			params: httpParams,
		});
	}

	override addDistributor(params: IDistributor): Observable<CreateDistributorResponse<IDistributor>> {
		return this.http.post<CreateDistributorResponse<IDistributor>>(`${this.apiUrl}/smw-api/distributor`, params);
	}
	override deleteDistributor(params: ParamsID): Observable<any> {
		const url = `${this.apiUrl}/smw-api/distributor?Id=${params.Id}`;
		return this.http.delete<any>(url);
	}
}
