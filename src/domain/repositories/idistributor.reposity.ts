import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ParamsID } from '../../core/params/paramID';
import { RequestParams } from '../../core/params/requestParams';
import { IDistributor } from 'data/requests/distributor/distributor.request';
import { CreateDistributorResponse } from 'data/responses/distributor/create.distributor.reponses';
import { DetailDistributorResponse } from 'data/responses/distributor/detail.distributor.reponses';
import { ListDistributorResponse } from 'data/responses/distributor/distributor.reponses';
import { UpdateDistributorResponse } from 'data/responses/distributor/update.distributor.reponses';

@Injectable({ providedIn: 'root' })
export abstract class IDistributorRepository {
	abstract getDistributors(params: RequestParams): Observable<ListDistributorResponse<IDistributor>>;

	abstract addDistributor(params: IDistributor): Observable<CreateDistributorResponse<IDistributor>>;

	abstract deleteDistributor(params: ParamsID): Observable<any>;

	abstract updateDistributor(params: IDistributor): Observable<UpdateDistributorResponse<IDistributor>>;

	abstract detailDistributor(params: ParamsID): Observable<DetailDistributorResponse<IDistributor>>;
}
