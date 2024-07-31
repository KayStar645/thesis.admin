import { Result } from 'core/types/types';
import { IProfit } from 'data/requests/profit/profit-request';

export interface ProfitDetailResponse extends Result<IProfit> {}
