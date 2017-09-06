import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SmsVerify } from './sms-verify.model';
import { JhiDateUtils } from 'ng-jhipster';
@Injectable()
export class SmsVerifyService {

    private resourceUrl = 'api/sms-verifies';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(smsVerify: SmsVerify): Observable<SmsVerify> {
        const copy: SmsVerify = Object.assign({}, smsVerify);
        // copy.verifyTime = this.dateUtils.toDate(smsVerify.verifyTime);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(smsVerify: SmsVerify): Observable<SmsVerify> {
        const copy: SmsVerify = Object.assign({}, smsVerify);

        // copy.verifyTime = this.dateUtils.toDate(smsVerify.verifyTime);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<SmsVerify> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            jsonResponse.verifyTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.verifyTime);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: any): any {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].verifyTime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].verifyTime);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        const options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            const params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
