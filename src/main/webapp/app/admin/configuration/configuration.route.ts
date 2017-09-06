import { Route } from '@angular/router';

import { SmartsoftConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
    path: 'smartsoft-configuration',
    component: SmartsoftConfigurationComponent,
    data: {
        pageTitle: 'configuration.title'
    }
};
