import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SmsVerify } from './sms-verify.model';
import { SmsVerifyPopupService } from './sms-verify-popup.service';
import { SmsVerifyService } from './sms-verify.service';

@Component({
    selector: 'jhi-sms-verify-delete-dialog',
    templateUrl: './sms-verify-delete-dialog.component.html'
})
export class SmsVerifyDeleteDialogComponent {

    smsVerify: SmsVerify;

    constructor(
        private smsVerifyService: SmsVerifyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.smsVerifyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'smsVerifyListModification',
                content: 'Deleted an smsVerify'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sms-verify-delete-popup',
    template: ''
})
export class SmsVerifyDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private smsVerifyPopupService: SmsVerifyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.smsVerifyPopupService
                .open(SmsVerifyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
