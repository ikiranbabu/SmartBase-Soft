import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SmartsoftCodeGroupModule } from "./code-group/code-group.module";
import { SmartsoftCodeModule } from "./code/code.module";
import { SmartsoftSmsVerifyModule } from "./sms-verify/sms-verify.module";


@NgModule({
    imports: [
        SmartsoftCodeGroupModule,
        SmartsoftCodeModule,
        SmartsoftSmsVerifyModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysMgrModule {}
