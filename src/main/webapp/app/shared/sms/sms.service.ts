import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SmsService {

    constructor(private http: Http) {}

    sendSMS(mobile: string): Observable<any> {

        return this.http.post('/api/verify/sms', {
            mobile: mobile
        });
    }
}
