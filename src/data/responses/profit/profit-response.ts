import { ResultList, ExtraList } from 'core/types/types';
import { IProfit } from 'data/requests/profit/profit-request';

export interface ListProfitResponse extends ResultList<IProfit> {
	extra: ExtraList;
}
