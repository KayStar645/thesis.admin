import { ICustomer } from '../../requests/customer/customer.request';
import { ExtraList } from '../../../core/types/types';
import { ResultList } from '../../../core/types/types';

export interface ListCustomerResponse<ICustomer> extends ResultList<ICustomer> {
  extra: ExtraList;
}
