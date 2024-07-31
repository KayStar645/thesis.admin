import { Result } from '../../../core/types/types';

export interface CreateProductResponse<IProduct> extends Result<IProduct> {
  data: IProduct;
}
