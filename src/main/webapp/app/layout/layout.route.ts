import { Routes, RouterModule }  from '@angular/router';
import { LayoutComponent } from './layout.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule'},
            { path: 'admin', loadChildren: '../admin/admin.module#SmartsoftAdminModule'},
            { path: 'account', loadChildren: '../account/account.module#SmartsoftAccountModule'},
            { path: 'acc-ctrl', loadChildren: '../acc-ctrl/acc-ctrl.module#AccCtrlModule'},
            { path: 'sys-mgr', loadChildren: '../sys-mgr/sys-mgr.module#SysMgrModule'},
            { path: 'another-page', loadChildren: '../another/another.module#AnotherModule' },
        ]
    }
];

// export const ROUTES = RouterModule.forChild(routes);
