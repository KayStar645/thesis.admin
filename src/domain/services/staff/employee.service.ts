import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { EmployeeRepository } from 'data/datasources/remote/repo-implementations/staff/staff.repository';
import { IEmployee } from 'data/requests/staff/employees.request';
import { CreateEmployeeResponse } from 'data/responses/staff/create-employee.reponses';
import { ListEmployeeResponse } from 'data/responses/staff/employees.responses';
import { UpdateEmployeeResponse } from 'data/responses/staff/update-employee.reponses';
import { Observable } from 'rxjs'; // Import of từ rxjs

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	constructor(private employeeRepository: EmployeeRepository) {}

	getEmployees(): Observable<ListEmployeeResponse<IEmployee>> {
		return this.employeeRepository.getEmployees();
	}

	addEmployee(param: IEmployee): Observable<CreateEmployeeResponse<IEmployee>> {
		return this.employeeRepository.addEmployee(param);
	}
	getEmployees_pageparams(params: RequestParams): Observable<ListEmployeeResponse<IEmployee>> {
		return this.employeeRepository.getEmployees_pageparams(params);
	}

	deleteEmployee(param: ParamsID): Observable<any> {
		return this.employeeRepository.deleteEmployee(param);
	}

	updateEmployee(param: IEmployee): Observable<UpdateEmployeeResponse<IEmployee>> {
		return this.employeeRepository.updateEmployee(param);
	}

	detailEmployee(param: ParamsID): Observable<UpdateEmployeeResponse<IEmployee>> {
		return this.employeeRepository.detailEmployee(param);
	}
}
