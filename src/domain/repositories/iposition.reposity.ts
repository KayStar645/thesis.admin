import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IPosition } from 'data/requests/position/position.request';
import { UpdateEmployeeResponse } from 'data/responses/staff/update-employee.reponses';
import { CreatePositionResponse } from 'data/responses/position/create-position.reponses';
import { ListPositionResponse } from 'data/responses/position/position.reponses';
import { Observable } from 'rxjs';
import { DetailPositionResponse } from 'data/responses/position/detail.role.reponses';

@Injectable({ providedIn: 'root' })
export abstract class IPositionRepository {
	abstract getPosition(): Observable<ListPositionResponse<IPosition>>;

	abstract getPosition_params(params: RequestParams): Observable<ListPositionResponse<IPosition>>;

	abstract addPosition(params: IPosition): Observable<CreatePositionResponse<IPosition>>;

	abstract deletePosition(params: ParamsID): Observable<any>;

	abstract updatePosition(params: IPosition): Observable<UpdateEmployeeResponse<IPosition>>;

	abstract detailPosition(params: ParamsID): Observable<DetailPositionResponse<IPosition>>;
}
