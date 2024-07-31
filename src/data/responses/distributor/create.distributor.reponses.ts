import { Result } from '../../../core/types/types';

export interface CreateDistributorResponse<IDistributor>
  extends Result<IDistributor> {
  data: IDistributor;
}
