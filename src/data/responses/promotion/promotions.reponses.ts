import { ExtraList } from '../../../core/types/types';
import { ResultList } from '../../../core/types/types';

export interface ListPromotionResponse<IPromotion>
  extends ResultList<IPromotion> {
  extra: ExtraList;
}
