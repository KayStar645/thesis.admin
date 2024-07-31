import { ResultList, ExtraList } from 'core/types/types';
import { IDelivery } from 'data/requests/delivery/delivery-request';

export interface ListDeliveryResponse extends ResultList<IDelivery> {
	extra: ExtraList;
}
