import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmartsoftSharedModule } from '../../shared';
import {
    CodeGroupService,
    CodeGroupPopupService,
    CodeGroupComponent,
    CodeGroupDetailComponent,
    CodeGroupDialogComponent,
    CodeGroupPopupComponent,
    CodeGroupDeletePopupComponent,
    CodeGroupDeleteDialogComponent,
    codeGroupRoute,
    codeGroupPopupRoute,
    CodeGroupResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...codeGroupRoute,
    ...codeGroupPopupRoute,
];

@NgModule({
    imports: [
        SmartsoftSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CodeGroupComponent,
        CodeGroupDetailComponent,
        CodeGroupDialogComponent,
        CodeGroupDeleteDialogComponent,
        CodeGroupPopupComponent,
        CodeGroupDeletePopupComponent,
    ],
    entryComponents: [
        CodeGroupComponent,
        CodeGroupDialogComponent,
        CodeGroupPopupComponent,
        CodeGroupDeleteDialogComponent,
        CodeGroupDeletePopupComponent,
    ],
    providers: [
        CodeGroupService,
        CodeGroupPopupService,
        CodeGroupResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmartsoftCodeGroupModule {}
