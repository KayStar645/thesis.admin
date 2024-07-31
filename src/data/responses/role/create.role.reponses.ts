import { Result } from 'core/types/types';

export interface CreateRoleResponse<IDistributor> extends Result<IDistributor> {
	data: IDistributor;
}
