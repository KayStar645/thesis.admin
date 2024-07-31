import { Result } from 'core/types/types';

export interface CreatePaymentMethodResponse<IPaymentMethod> extends Result<IPaymentMethod> {
	data: IPaymentMethod;
}
