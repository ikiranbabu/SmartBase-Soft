export class SmsVerify {
    constructor(
        public id?: number,
        public mobile?: string,
        public verifyCode?: string,
        public verifyTime?: any,
        public maxTryTimes?: number,
        public status?: string,
    ) {
    }
}
