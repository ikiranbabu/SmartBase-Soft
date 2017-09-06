import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { SmsVerify } from './sms-verify.model';
import { SmsVerifyService } from './sms-verify.service';
@Injectable()
export class SmsVerifyPopupService {
    // private isOpen = false;
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private smsVerifyService: SmsVerifyService

    ) {}

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;

            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.smsVerifyService.find(id).subscribe((smsVerify) => {
                    // smsVerify.verifyTime = this.datePipe
                    //     .transform(smsVerify.verifyTime, 'yyyy-MM-ddThh:mm');
                    this.smsVerifyModalRef(component, smsVerify);
                });
            } else {
                // return this.codeModalRef(component, new Code());
                setTimeout(() => {
                    this.ngbModalRef = this.smsVerifyModalRef(component, new SmsVerify());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        })
    }

    smsVerifyModalRef(component: Component, smsVerify: SmsVerify): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.smsVerify = smsVerify;
        modalRef.result.then((result) => {
            this.router.navigate(['/app/sys-mgr/', { outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate(['/app/sys-mgr/', { outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
