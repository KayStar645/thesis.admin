import { ResultList, ExtraList } from 'core/types/types';
import { IImportGoods } from 'data/requests/import-goods/import-goods-request';

export interface ListImportGoodsResponse extends ResultList<IImportGoods> {
	extra: ExtraList;
}
