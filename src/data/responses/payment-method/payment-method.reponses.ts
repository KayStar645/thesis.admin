import { ResultList, ExtraList } from 'core/types/types';

export interface ListPaymentMethodResponse<IPaymentMethod> extends ResultList<IPaymentMethod> {
	extra: ExtraList;
}
