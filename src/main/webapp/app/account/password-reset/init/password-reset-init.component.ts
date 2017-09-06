import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';

import { PasswordResetInitService } from './password-reset-init.service';
import { Router } from "@angular/router";

@Component({
    selector: 'smartsoft-password-reset-init',
    templateUrl: './password-reset-init.component.html'
})
export class PasswordResetInitComponent implements OnInit, AfterViewInit {
    error: string;
    errorEmailNotExists: string;
    resetAccount: any;
    success: string;

    mobile: string;
    verifyCode: string;
    password: string;
    confirmPassword: string;
    smsResponseMessage: string;
    doNotMatch: string;

    constructor(
        private passwordResetInitService: PasswordResetInitService,
        private elementRef: ElementRef,
        private router: Router,
        private renderer: Renderer
    ) {
    }

    ngOnInit() {
        this.resetAccount = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    requestReset() {
        this.error = null;
        this.errorEmailNotExists = null;

        this.passwordResetInitService.save(this.resetAccount.email).subscribe(() => {
            this.success = 'OK';
        }, (response) => {
            this.success = null;
            if (response.status === 400 && response.data === 'email address not registered') {
                this.errorEmailNotExists = 'ERROR';
            } else {
                this.error = 'ERROR';
            }
        });
    }

    resetPassword() {
        this.doNotMatch = null;
        this.error = null;
        if (this.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.passwordResetInitService.resetPassword(this.mobile, this.verifyCode, this.password).subscribe(() => {
                this.success = 'OK';
            }, (response) => {
                this.success = null;
                this.error = response._body;
            });
        }
    }

    smsMessage (message: string){
        console.log('>>> message from sms component: ', message);
        this.smsResponseMessage = message;
    }

    gotoLogin() {
        // this.modalRef = this.loginModalService.open();
        this.router.navigate(['login']);
    }
}
