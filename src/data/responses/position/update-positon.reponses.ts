import { Result } from 'core/types/types';
import { IPosition } from 'data/requests/position/position.request';

export interface UpdateEmployeeResponse<Employee> extends Result<IPosition> {}
