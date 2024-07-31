import { ExtraList, ResultList } from 'core/types/types';
import { ICoupon } from 'data/requests/coupon/coupon-request';

export interface ListCouponResponse extends ResultList<ICoupon> {
	extra: ExtraList;
}
