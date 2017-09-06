import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmartsoftSharedModule } from '../../shared';
import {
    SmsVerifyService,
    SmsVerifyPopupService,
    SmsVerifyComponent,
    SmsVerifyDetailComponent,
    SmsVerifyDialogComponent,
    SmsVerifyPopupComponent,
    SmsVerifyDeletePopupComponent,
    SmsVerifyDeleteDialogComponent,
    smsVerifyRoute,
    smsVerifyPopupRoute,
    SmsVerifyResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...smsVerifyRoute,
    ...smsVerifyPopupRoute,
];

@NgModule({
    imports: [
        SmartsoftSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SmsVerifyComponent,
        SmsVerifyDetailComponent,
        SmsVerifyDialogComponent,
        SmsVerifyDeleteDialogComponent,
        SmsVerifyPopupComponent,
        SmsVerifyDeletePopupComponent,
    ],
    entryComponents: [
        SmsVerifyComponent,
        SmsVerifyDialogComponent,
        SmsVerifyPopupComponent,
        SmsVerifyDeleteDialogComponent,
        SmsVerifyDeletePopupComponent,
    ],
    providers: [
        SmsVerifyService,
        SmsVerifyPopupService,
        SmsVerifyResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmartsoftSmsVerifyModule {}
