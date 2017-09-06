import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager   } from 'ng-jhipster';

import { SmsVerify } from './sms-verify.model';
import { SmsVerifyService } from './sms-verify.service';

@Component({
    selector: 'jhi-sms-verify-detail',
    templateUrl: './sms-verify-detail.component.html'
})
export class SmsVerifyDetailComponent implements OnInit, OnDestroy {

    smsVerify: SmsVerify;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private smsVerifyService: SmsVerifyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSmsVerifies();
    }

    load(id) {
        this.smsVerifyService.find(id).subscribe((smsVerify) => {
            this.smsVerify = smsVerify;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSmsVerifies() {
        this.eventSubscriber = this.eventManager.subscribe('smsVerifyListModification', (response) => this.load(this.smsVerify.id));
    }
}
