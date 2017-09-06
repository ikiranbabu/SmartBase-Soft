import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SmartsoftRoleModule } from './role/role.module';
import { SmartsoftPermissionModule } from './permission/permission.module';
import { SmartsoftResourceModule } from './resource/resource.module';
import { SmartsoftUserMgrModule } from "./user-management/user-management.module";
import { SmartsoftPermissionGroupModule } from './permission-group/permission-group.module';


@NgModule({
    imports: [
        SmartsoftRoleModule,
        SmartsoftPermissionModule,
        SmartsoftResourceModule,
        SmartsoftUserMgrModule,
        SmartsoftPermissionGroupModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccCtrlModule {}
