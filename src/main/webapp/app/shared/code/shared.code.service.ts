import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { JhiDateUtils } from "ng-jhipster";
import { Observable } from "rxjs";

@Injectable()
export class SharedCodeService{
    private resourceUrl = 'api/codes';
    private codesGroupCodeUrl = 'api/codes/group-code';

    private _cachedCode: Map<string, any> = new Map();

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
            ;
    }

    getCodeByCodeGroup(codeGroupCode: string): Observable<Response>{
        const options: BaseRequestOptions = new BaseRequestOptions();
            const params: URLSearchParams = new URLSearchParams();
            params.set('groupCode', codeGroupCode);

            options.params = params;
        return this.http.get(this.codesGroupCodeUrl, options).map(
            (res: any) => this.convertResponse(res)
        );
    }

    getCodeValue(code: string, codeGroupCode: string): Observable<Response> {
        let key = code + '~' + codeGroupCode;
        if (this._cachedCode.has(key)){
            return Observable.of(this._cachedCode.get(key));
        }
        return this.http.get(`${this.resourceUrl}/${code}/${codeGroupCode}`).map((res: Response) => {
            let jsonResponse = res.json();
            this._cachedCode.set(key, jsonResponse);
            return jsonResponse;
        });
    }

    private convertResponse(res: any): any {
        let jsonResponse = res.json();
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
