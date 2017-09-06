import { Route } from '@angular/router';

import { SmartsoftDocsComponent } from './docs.component';

export const docsRoute: Route = {
    path: 'docs',
    component: SmartsoftDocsComponent,
    data: {
        pageTitle: 'global.menu.admin.apidocs'
    }
};
