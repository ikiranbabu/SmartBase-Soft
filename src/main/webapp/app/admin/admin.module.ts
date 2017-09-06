import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmartsoftSharedModule } from '../shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
    adminState,
    AuditsComponent,
    LogsComponent,
    SmartsoftMetricsMonitoringModalComponent,
    SmartsoftMetricsMonitoringComponent,
    SmartsoftHealthModalComponent,
    SmartsoftHealthCheckComponent,
    SmartsoftConfigurationComponent,
    SmartsoftDocsComponent,
    AuditsService,
    SmartsoftConfigurationService,
    SmartsoftHealthService,
    SmartsoftMetricsService,
    LogsService,
} from './';

@NgModule({
    imports: [
        SmartsoftSharedModule,
        RouterModule.forChild(adminState)
    ],
    declarations: [
        AuditsComponent,
        LogsComponent,
        SmartsoftConfigurationComponent,
        SmartsoftHealthCheckComponent,
        SmartsoftHealthModalComponent,
        SmartsoftDocsComponent,
        SmartsoftMetricsMonitoringComponent,
        SmartsoftMetricsMonitoringModalComponent
    ],
    entryComponents: [
        SmartsoftHealthModalComponent,
        SmartsoftMetricsMonitoringModalComponent,
    ],
    providers: [
        AuditsService,
        SmartsoftConfigurationService,
        SmartsoftHealthService,
        SmartsoftMetricsService,
        LogsService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmartsoftAdminModule {}
