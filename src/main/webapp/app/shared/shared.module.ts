import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    SmartsoftSharedLibsModule,
    SmartsoftSharedCommonModule,
    HasAnyAuthorityDirective,
    SmartsoftLoginModalComponent
} from './';
import { HasAnyPermissionDirective } from "./auth/has-any-permission.directive";
import { CodeValuePipe } from "./pipes/code.value.pipe";
import { NamePipe } from "./pipes/name.pipe";
import { AsyncUniqueValidatorDirective } from "./validators/async.unique.validator";
import { LoadingSpinnerComponent } from "./loading-spinner/loading.spinner.component";
import { PasswordStrengthBarComponent } from "../account/password/password-strength-bar.component";
import { PasswordResetInitComponent } from "../account/password-reset/init/password-reset-init.component";
import { PasswordResetFinishComponent } from "../account/password-reset/finish/password-reset-finish.component";
import { RegisterComponent } from "../account/register/register.component";
import { SmsComponent } from "./sms/sms.component";
import { customHttpProvider } from "../blocks/interceptor/http.provider";

@NgModule({
    imports: [
        SmartsoftSharedLibsModule,
        SmartsoftSharedCommonModule
    ],
    declarations: [
        SmartsoftLoginModalComponent,
        HasAnyAuthorityDirective,
        HasAnyPermissionDirective,
        CodeValuePipe,
        NamePipe,
        AsyncUniqueValidatorDirective,
        LoadingSpinnerComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        RegisterComponent,
        SmsComponent,
    ],
    providers: [
        customHttpProvider()
    ],
    entryComponents: [SmartsoftLoginModalComponent],
    exports: [
        SmartsoftSharedCommonModule,
        SmartsoftLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        HasAnyPermissionDirective,
        CodeValuePipe,
        NamePipe,
        AsyncUniqueValidatorDirective,
        LoadingSpinnerComponent,
        SmsComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SmartsoftSharedModule {}
