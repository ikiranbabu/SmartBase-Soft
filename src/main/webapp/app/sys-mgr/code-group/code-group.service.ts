import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CodeGroup } from './code-group.model';
import { JhiDateUtils } from 'ng-jhipster';
@Injectable()
export class CodeGroupService {

    private resourceUrl = 'api/code-groups';
    public validateUrl = 'api/code-groups/validate';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(codeGroup: CodeGroup): Observable<CodeGroup> {
        const copy: CodeGroup = Object.assign({}, codeGroup);
        copy.createDate = this.dateUtils.toDate(codeGroup.createDate);
        copy.updateDate = this.dateUtils.toDate(codeGroup.updateDate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(codeGroup: CodeGroup): Observable<CodeGroup> {
        const copy: CodeGroup = Object.assign({}, codeGroup);

        copy.createDate = this.dateUtils.toDate(codeGroup.createDate);

        copy.updateDate = this.dateUtils.toDate(codeGroup.updateDate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<CodeGroup> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            jsonResponse.createDate = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.createDate);
            jsonResponse.updateDate = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.updateDate);
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
            jsonResponse[i].createDate = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].createDate);
            jsonResponse[i].updateDate = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].updateDate);
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

            options.params = params;
        }
        return options;
    }
}
