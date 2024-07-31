import { ResultList, ExtraList } from 'core/types/types';

export interface ListPositionResponse<Position> extends ResultList<Position> {
	extra: ExtraList;
	data: Position[];
}
