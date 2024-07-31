import { IEmployee } from '../../requests/staff/employees.request';
import { ExtraList } from '../../../core/types/types';
import { ResultList } from '../../../core/types/types';

export interface ListEmployeeResponse<IEmployee> extends ResultList<IEmployee> {
  extra: ExtraList;
  data: IEmployee[];
}
