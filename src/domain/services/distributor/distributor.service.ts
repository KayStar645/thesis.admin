import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Import of từ rxjs
import { RequestParams } from '../../../core/params/requestParams';
import { ParamsID } from '../../../core/params/paramID';
import { DistributorRepository } from 'data/datasources/remote/repo-implementations/distributor/distributor.repository';
import { IDistributor } from 'data/requests/distributor/distributor.request';
import { CreateDistributorResponse } from 'data/responses/distributor/create.distributor.reponses';
import { DetailDistributorResponse } from 'data/responses/distributor/detail.distributor.reponses';
import { ListDistributorResponse } from 'data/responses/distributor/distributor.reponses';
import { UpdateDistributorResponse } from 'data/responses/distributor/update.distributor.reponses';

@Injectable({
	providedIn: 'root',
})
export class DistributorService {
	constructor(private distributorRepository: DistributorRepository) {}

	getDistributor(params: RequestParams): Observable<ListDistributorResponse<IDistributor>> {
		return this.distributorRepository.getDistributors(params);
	}

	detailDistributor(param: ParamsID): Observable<DetailDistributorResponse<IDistributor>> {
		return this.distributorRepository.detailDistributor(param);
	}
	updateDistributor(param: IDistributor): Observable<UpdateDistributorResponse<IDistributor>> {
		return this.distributorRepository.updateDistributor(param);
	}
	deleteDistributor(param: ParamsID): Observable<any> {
		return this.distributorRepository.deleteDistributor(param);
	}
	addDistributor(param: IDistributor): Observable<CreateDistributorResponse<IDistributor>> {
		return this.distributorRepository.addDistributor(param);
	}
}
