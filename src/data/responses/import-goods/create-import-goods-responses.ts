import { Result } from 'core/types/types';
import { IImportGoods } from 'data/requests/import-goods/import-goods-request';

export interface CreateImportGoodsResponse extends Result<IImportGoods> {
	data: IImportGoods;
}
