import { ExtraList } from '../../../core/types/types';
import { ResultList } from '../../../core/types/types';

export interface ListDistributorResponse<IDistributor>
  extends ResultList<IDistributor> {
  extra: ExtraList;
}
