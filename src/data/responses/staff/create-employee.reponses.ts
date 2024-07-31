import { Result } from '../../../core/types/types';

export interface CreateEmployeeResponse<IEmployee> extends Result<IEmployee> {
	data: IEmployee;
}
