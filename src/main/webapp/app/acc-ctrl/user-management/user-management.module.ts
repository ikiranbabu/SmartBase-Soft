import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmartsoftSharedModule } from '../../shared';
import { userDialogRoute, userMgmtRoute, UserResolve, UserResolvePagingParams } from "./user-management.route";
import { UserMgmtComponent } from "./user-management.component";
import { UserDialogComponent, UserMgmtDialogComponent } from "./user-management-dialog.component";
import { UserDeleteDialogComponent, UserMgmtDeleteDialogComponent } from "./user-management-delete-dialog.component";
import { UserMgmtDetailComponent } from "./user-management-detail.component";
import { UserModalService } from "./user-modal.service";
import { RoleService } from "../role/role.service";

let ENTITY_STATES = [
    ...userMgmtRoute,
    ...userDialogRoute,
];

@NgModule({
    imports: [
        SmartsoftSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserMgmtComponent,
        UserDialogComponent,
        UserDeleteDialogComponent,
        UserMgmtDetailComponent,
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent
    ],
    entryComponents: [
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
    ],
    providers: [
        UserResolvePagingParams,
        UserResolve,
        UserModalService

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmartsoftUserMgrModule {}
