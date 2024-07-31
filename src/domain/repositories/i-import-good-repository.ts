import { Injectable } from '@angular/core';
import { ParamsID } from 'core/params/paramID';
import { RequestParams } from 'core/params/requestParams';
import { IImportGoods } from 'data/requests/import-goods/import-goods-request';
import { IUpdateStatusImportGoods } from 'data/requests/import-goods/update-status-product-request';
import { CreateImportGoodsResponse } from 'data/responses/import-goods/create-import-goods-responses';
import { DetailImportGoodsResponse } from 'data/responses/import-goods/detail-import-goods-responses';
import { ListImportGoodsResponse } from 'data/responses/import-goods/import-goods-responses';
import { UpdateImportGoodsResponse } from 'data/responses/import-goods/update-import-goods-responses';
import { UpdateStatusImportGoodsResponse } from 'data/responses/import-goods/update-status-import-goods-responses';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class IImportGoodsRepository {
	abstract getImportGoods(): Observable<ListImportGoodsResponse>;

	abstract getImportGoods_pageparams(params: RequestParams): Observable<ListImportGoodsResponse>;

	abstract getImportGoods_allparams(params: RequestParams): Observable<ListImportGoodsResponse>;

	abstract addImportGoods(params: IImportGoods): Observable<CreateImportGoodsResponse>;

	abstract deleteImportGoods(params: ParamsID): Observable<any>;

	abstract updateImportGoods(params: IImportGoods): Observable<UpdateImportGoodsResponse>;

	abstract detailImportGoods(params: ParamsID): Observable<DetailImportGoodsResponse>;

	abstract updateStatusImportGoods(params: IUpdateStatusImportGoods): Observable<UpdateStatusImportGoodsResponse>;
}
