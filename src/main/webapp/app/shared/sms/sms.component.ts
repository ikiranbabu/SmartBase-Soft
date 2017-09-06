import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SmsService } from "./sms.service";

@Component({
    selector: 'smartsoft-sms',
    templateUrl: './sms.component.html',
    styleUrls: ['sms.component.scss']
})
export class SmsComponent implements OnInit{
    verifyCodeName: string;
    verifyButtonDisabled: boolean;
    wait: number;

    @Input() mobile: string;
    @Output() message: EventEmitter<string>;

    constructor(private smsService: SmsService){
        this.message = new EventEmitter();
    }

    ngOnInit (){
        this.wait = 90;
        this.verifyButtonDisabled = false;
        this.verifyCodeName = '获取验证码';
    }

    sendVerifyCode() {
        if (!this.mobile){
            this.message.emit('请输入手机号码');
            return;
        }

        this.verifyButtonDisabled = true;
        this.time();

        this.smsService.sendSMS(this.mobile).subscribe((response) => {
            //success
            this.message.emit('');
        }, (response) => {
            //error
            this.message.emit(response.body);
        });
    }

    time() {
        let self = this;
        if (this.wait === 0) {
            this.verifyButtonDisabled = false;
            this.verifyCodeName = "获取验证码";
            this.wait = 90;
        } else {
            this.verifyCodeName = "重新发送(" + this.wait + ")";
            this.wait--;
            setTimeout(function () {
                    self.time();
                },
                1000);
        }
    }

}
