import { ResultList, ExtraList } from 'core/types/types';

export interface ListProductResponse<IProduct> extends ResultList<IProduct> {
	extra: ExtraList;
}
