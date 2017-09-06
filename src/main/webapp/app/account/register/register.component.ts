import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { Router } from '@angular/router';

import { Register } from './register.service';
import { LoginModalService } from '../../shared';
import { LoginService } from '../../shared/login/login.service';

@Component({
    selector: 'smartsoft-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {

    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    alert: boolean;
    successAlert: boolean;
    verifyCodeName: string;
    verifyButtonDisabled: boolean;
    wait: number;
    modalRef: NgbModalRef;
    smsResponseMessage: string;


    constructor(
        private languageService: JhiLanguageService,
        private loginModalService: LoginModalService,
        private registerService: Register,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private loginService: LoginService,
        private router: Router
    ) {
        // this.languageService.setLocations(['register']);
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
        this.wait = 90;
        this.verifyButtonDisabled = false;
        this.alert = false;
        this.successAlert = false;
        this.verifyCodeName = '获取验证码';
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    register() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.languageService.getCurrent().then((key) => {
                this.registerAccount.langKey = key;
                this.registerService.save(this.registerAccount).subscribe(() => {
                    this.success = true;
                }, (response) => this.processError(response));
            });
        }
    }

    openLogin() {
        // this.modalRef = this.loginModalService.open();
        this.router.navigate(['login']);
    }

    smsMessage(message: string) {
        console.log('>>> message from sms component: ', message);
        this.smsResponseMessage = message;
    }

    sendVerifyCode() {

        this.alert = false;
        this.successAlert = false;
        this.verifyButtonDisabled = true;
        this.time();

        this.registerService.sendSMS(this.registerAccount.mobile).subscribe(authenticateSuccess, authenticateError);

        function authenticateSuccess(response) {
            const self = this;
            self.successMessage = '发送成功';
            self.successAlert = true;
            setTimeout(function () {
                self.successAlert = false;
            }, 3000);
        }

        function authenticateError(response) {
            const self = this;
            self.errorMessage = response.body;
            self.alert = true;
        }
    }

    time() {
        const self = this;
        if (this.wait === 0) {
            this.verifyButtonDisabled = false;
            this.verifyCodeName = '获取验证码';
            this.wait = 90;
        } else {
            this.verifyCodeName = '重新发送(' + this.wait + ')';
            this.wait--;
            setTimeout(function() {
                    self.time();
                },
                1000);
        }
    }

    checkMobile(string) {
        const pattern = /^1\d{10}$/;
        if (pattern.test(string)) {
            return true;
        }
        return false;
    }

    private processError(response) {
        this.success = null;
        if (response.status === 400 && response._body === 'login already in use') {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response._body === 'email address already in use') {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
