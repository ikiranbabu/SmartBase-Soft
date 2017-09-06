import { Route } from '@angular/router';

import { SmartsoftMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
    path: 'smartsoft-metrics',
    component: SmartsoftMetricsMonitoringComponent,
    data: {
        pageTitle: 'metrics.title'
    }
};
