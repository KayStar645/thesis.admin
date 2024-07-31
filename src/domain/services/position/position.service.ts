import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { UpdateEmployeeResponse } from 'data/responses/staff/update-employee.reponses';
import { CreatePositionResponse } from 'data/responses/position/create-position.reponses';
import { ListPositionResponse } from 'data/responses/position/position.reponses';
import { Observable } from 'rxjs'; // Import of từ rxjs
import { PositionRepository } from 'data/datasources/remote/repo-implementations/position/position.repository';
import { IPosition } from 'data/requests/position/position.request';
import { DetailPositionResponse } from 'data/responses/position/detail.role.reponses';

@Injectable({
	providedIn: 'root',
})
export class PositionService {
	constructor(private positionRepository: PositionRepository) {}

	//Lấy danh sách chức vụ nhân viên
	getEmployeesPositon(): Observable<ListPositionResponse<IPosition>> {
		return this.positionRepository.getPosition();
	}
	//Thêm chức vụ nhân viên
	addPosition(position: IPosition): Observable<CreatePositionResponse<IPosition>> {
		return this.positionRepository.addPosition(position);
	}

	getEmployeesPositon_params(params: RequestParams): Observable<ListPositionResponse<IPosition>> {
		return this.positionRepository.getPosition_params(params);
	}

	deletePosition(param: ParamsID): Observable<any> {
		return this.positionRepository.deletePosition(param);
	}

	updatePosition(param: IPosition): Observable<UpdateEmployeeResponse<IPosition>> {
		return this.positionRepository.updatePosition(param);
	}

	detailPosition(param: ParamsID): Observable<DetailPositionResponse<IPosition>> {
		return this.positionRepository.detailPosition(param);
	}
}
