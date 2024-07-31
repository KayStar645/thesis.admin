import { ResultList, ExtraList } from 'core/types/types';

export interface ListCategoryResponse<ICategory> extends ResultList<ICategory> {
	extra: ExtraList;
}
