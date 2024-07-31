import { ExtraList } from '../../../core/types/types';
import { ResultList } from '../../../core/types/types';

export interface ListSupplierOrderResponse<ISupplierOrder>
  extends ResultList<ISupplierOrder> {
  extra: ExtraList;
}
