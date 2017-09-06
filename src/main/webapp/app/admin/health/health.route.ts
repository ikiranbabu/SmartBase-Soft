import { Route } from '@angular/router';

import { SmartsoftHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
    path: 'smartsoft-health',
    component: SmartsoftHealthCheckComponent,
    data: {
        pageTitle: 'health.title'
    }
};
