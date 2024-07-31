import { ExtraList, ResultList } from '../../../core/types/types';

export interface ListRoleResponse<IRole> extends ResultList<IRole> {
	extra: ExtraList;
}
