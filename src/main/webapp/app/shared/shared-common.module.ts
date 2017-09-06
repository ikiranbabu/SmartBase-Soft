import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {
    SmartsoftSharedLibsModule,
    JhiLanguageHelper,
    FindLanguageFromKeyPipe,
    SmartsoftAlertComponent,
    SmartsoftAlertErrorComponent
} from './';

@NgModule({
    imports: [
        SmartsoftSharedLibsModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        SmartsoftAlertComponent,
        SmartsoftAlertErrorComponent
    ],
    providers: [
        JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'zh-cn'
        },
    ],
    exports: [
        SmartsoftSharedLibsModule,
        FindLanguageFromKeyPipe,
        SmartsoftAlertComponent,
        SmartsoftAlertErrorComponent
    ]
})
export class SmartsoftSharedCommonModule {}
