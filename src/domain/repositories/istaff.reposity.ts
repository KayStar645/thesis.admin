import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IEmployee } from 'data/requests/staff/employees.request';
import { CreateEmployeeResponse } from 'data/responses/staff/create-employee.reponses';
import { DetailEmployeeResponse } from 'data/responses/staff/detail-employee.reponses';
import { ListEmployeeResponse } from 'data/responses/staff/employees.responses';
import { UpdateEmployeeResponse } from 'data/responses/staff/update-employee.reponses';

@Injectable({ providedIn: 'root' })
export abstract class IEmployeeRepository {
	abstract getEmployees(): Observable<ListEmployeeResponse<IEmployee>>;

	abstract getEmployees_pageparams(params: RequestParams): Observable<ListEmployeeResponse<IEmployee>>;

	abstract getEmployees_allparams(params: RequestParams): Observable<ListEmployeeResponse<IEmployee>>;

	abstract addEmployee(params: IEmployee): Observable<CreateEmployeeResponse<IEmployee>>;

	abstract deleteEmployee(params: ParamsID): Observable<any>;

	abstract updateEmployee(params: IEmployee): Observable<UpdateEmployeeResponse<IEmployee>>;

	abstract detailEmployee(params: ParamsID): Observable<DetailEmployeeResponse<IEmployee>>;
}
