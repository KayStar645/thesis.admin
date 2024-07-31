import { Result } from '../../../core/types/types';

export interface CreatePromotionResponse<IPromotion>
  extends Result<IPromotion> {
  data: IPromotion;
}
