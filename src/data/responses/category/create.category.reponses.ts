import { Result } from 'core/types/types';

export interface CreateCategoryResponse<ICategory> extends Result<ICategory> {
	data: ICategory;
}
