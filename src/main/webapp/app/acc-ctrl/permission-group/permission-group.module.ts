import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmartsoftSharedModule } from '../../shared';
import {
    PermissionGroupService,
    PermissionGroupPopupService,
    PermissionGroupComponent,
    PermissionGroupDetailComponent,
    PermissionGroupDialogComponent,
    PermissionGroupPopupComponent,
    PermissionGroupDeletePopupComponent,
    PermissionGroupDeleteDialogComponent,
    permissionGroupRoute,
    permissionGroupPopupRoute,
    PermissionGroupResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...permissionGroupRoute,
    ...permissionGroupPopupRoute,
];

@NgModule({
    imports: [
        SmartsoftSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PermissionGroupComponent,
        PermissionGroupDetailComponent,
        PermissionGroupDialogComponent,
        PermissionGroupDeleteDialogComponent,
        PermissionGroupPopupComponent,
        PermissionGroupDeletePopupComponent,
    ],
    entryComponents: [
        PermissionGroupComponent,
        PermissionGroupDialogComponent,
        PermissionGroupPopupComponent,
        PermissionGroupDeleteDialogComponent,
        PermissionGroupDeletePopupComponent,
    ],
    providers: [
        PermissionGroupService,
        PermissionGroupPopupService,
        PermissionGroupResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmartsoftPermissionGroupModule {}
