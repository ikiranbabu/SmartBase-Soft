import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SmsVerify } from './sms-verify.model';
import { SmsVerifyPopupService } from './sms-verify-popup.service';
import { SmsVerifyService } from './sms-verify.service';

@Component({
    selector: 'jhi-sms-verify-dialog',
    templateUrl: './sms-verify-dialog.component.html'
})
export class SmsVerifyDialogComponent implements OnInit {

    smsVerify: SmsVerify;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private smsVerifyService: SmsVerifyService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.smsVerify.id !== undefined) {
            this.smsVerifyService.update(this.smsVerify)
                .subscribe((res: SmsVerify) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.smsVerifyService.create(this.smsVerify)
                .subscribe((res: SmsVerify) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: SmsVerify) {
        this.eventManager.broadcast({ name: 'smsVerifyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-sms-verify-popup',
    template: ''
})
export class SmsVerifyPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private smsVerifyPopupService: SmsVerifyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.smsVerifyPopupService
                    .open(SmsVerifyDialogComponent as Component, params['id']);
            } else {
                this.smsVerifyPopupService
                    .open(SmsVerifyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
