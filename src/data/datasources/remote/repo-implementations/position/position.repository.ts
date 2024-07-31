// staff.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IPosition } from 'data/requests/position/position.request';
import { UpdateEmployeeResponse } from 'data/responses/staff/update-employee.reponses';
import { CreatePositionResponse } from 'data/responses/position/create-position.reponses';
import { ListPositionResponse } from 'data/responses/position/position.reponses';
import { IPositionRepository } from 'domain/repositories/iposition.reposity';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { DetailPositionResponse } from 'data/responses/position/detail.role.reponses';

@Injectable({
	providedIn: 'root',
})
export class PositionRepository extends IPositionRepository {
	private apiUrl = environment.api;

	constructor(private http: HttpClient) {
		super();
	}

	override getPosition(): Observable<ListPositionResponse<IPosition>> {
		return this.http.get<ListPositionResponse<IPosition>>(
			`${this.apiUrl}/smw-api/staffposition
      `,
		);
	}
	override getPosition_params(params: RequestParams): Observable<ListPositionResponse<IPosition>> {
		const httpParams = new HttpParams()
			.set('Filters', params.filters)
			.set('Sorts', params.sorts)
			.set('Page', params.page.toString())
			.set('PageSize', params.pageSize.toString())
			.set('IsAllDetail', params.isAllDetail || true);
		return this.http.get<ListPositionResponse<IPosition>>(`${this.apiUrl}/smw-api/staffposition`, {
			params: httpParams,
		});
	}

	override addPosition(position: IPosition): Observable<CreatePositionResponse<IPosition>> {
		return this.http.post<CreatePositionResponse<IPosition>>(`${this.apiUrl}/smw-api/staffposition`, position);
	}

	override deletePosition(params: ParamsID): Observable<any> {
		const url = `${this.apiUrl}/smw-api/staffposition?Id=${params.Id}`;
		return this.http.delete<any>(url);
	}

	override updatePosition(params: IPosition): Observable<UpdateEmployeeResponse<IPosition>> {
		return this.http.put<UpdateEmployeeResponse<IPosition>>(`${this.apiUrl}/smw-api/staffposition`, params);
	}

	override detailPosition(params: ParamsID): Observable<DetailPositionResponse<IPosition>> {
		const httpParams = new HttpParams().set('Id', params.Id || 0).set('IsAllDetail', params.IsAllDetail || true);
		console.log(httpParams);
		return this.http.get<DetailPositionResponse<IPosition>>(`${this.apiUrl}/smw-api/staffposition/detail`, {
			params: httpParams,
		});
	}
}
