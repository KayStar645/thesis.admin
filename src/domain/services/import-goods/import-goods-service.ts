import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { ImportGoodsRepository } from 'data/datasources/remote/repo-implementations/import-goods/import-goods-repository';
import { IImportGoods } from 'data/requests/import-goods/import-goods-request';
import { IUpdateStatusImportGoods } from 'data/requests/import-goods/update-status-product-request';
import { CreateImportGoodsResponse } from 'data/responses/import-goods/create-import-goods-responses';
import { DetailImportGoodsResponse } from 'data/responses/import-goods/detail-import-goods-responses';
import { ListImportGoodsResponse } from 'data/responses/import-goods/import-goods-responses';
import { UpdateImportGoodsResponse } from 'data/responses/import-goods/update-import-goods-responses';
import { UpdateStatusImportGoodsResponse } from 'data/responses/import-goods/update-status-import-goods-responses';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ImportGoodsService {
	constructor(private importGoodsRepository: ImportGoodsRepository) {}

	getImportGoods(params: RequestParams): Observable<ListImportGoodsResponse> {
		return this.importGoodsRepository.getImportGoods_allparams(params);
	}

	getImportGoods_pageparams(params: RequestParams): Observable<ListImportGoodsResponse> {
		return this.importGoodsRepository.getImportGoods_pageparams(params);
	}

	detailImportGoods(param: ParamsID): Observable<DetailImportGoodsResponse> {
		return this.importGoodsRepository.detailImportGoods(param);
	}

	updateImportGoods(param: IImportGoods): Observable<UpdateImportGoodsResponse> {
		return this.importGoodsRepository.updateImportGoods(param);
	}

	deleteImportGoods(param: ParamsID): Observable<any> {
		return this.importGoodsRepository.deleteImportGoods(param);
	}

	addImportGoods(param: IImportGoods): Observable<CreateImportGoodsResponse> {
		return this.importGoodsRepository.addImportGoods(param);
	}

	updateStatusImportGoods(param: IUpdateStatusImportGoods): Observable<UpdateStatusImportGoodsResponse> {
		return this.importGoodsRepository.updateStatusImportGoods(param);
	}
}
