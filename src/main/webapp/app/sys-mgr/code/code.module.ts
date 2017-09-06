import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmartsoftSharedModule } from '../../shared';
import {
    CodeService,
    CodePopupService,
    CodeComponent,
    CodeDetailComponent,
    CodeDialogComponent,
    CodePopupComponent,
    CodeDeletePopupComponent,
    CodeDeleteDialogComponent,
    codeRoute,
    codePopupRoute,
    CodeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...codeRoute,
    ...codePopupRoute,
];

@NgModule({
    imports: [
        SmartsoftSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CodeComponent,
        CodeDetailComponent,
        CodeDialogComponent,
        CodeDeleteDialogComponent,
        CodePopupComponent,
        CodeDeletePopupComponent,
    ],
    entryComponents: [
        CodeComponent,
        CodeDialogComponent,
        CodePopupComponent,
        CodeDeleteDialogComponent,
        CodeDeletePopupComponent,
    ],
    providers: [
        CodeService,
        CodePopupService,
        CodeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmartsoftCodeModule {}
