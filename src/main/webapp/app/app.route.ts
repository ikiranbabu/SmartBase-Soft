import { Route, Routes } from '@angular/router';

import { SmartsoftErrorComponent } from './error/error.component';
import { passwordResetFinishRoute } from "./account/password-reset/finish/password-reset-finish.route";
import { passwordResetInitRoute } from "./account/password-reset/init/password-reset-init.route";
import { registerRoute } from "./account/register/register.route";


export const ROUTES: Routes = [
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        // path: 'app', loadChildren: () => new Promise(function (resolve) {
        //     (require as any).ensure([], function (require: any) {
        //         resolve(require('./layout/layout.module.ngfactory')['LazyModuleNgFactory']);
        //     });
        //
        // })
        path: 'app', loadChildren: './layout/layout.module#LayoutModule'
    },
    {
        path: 'login', loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'error', component: SmartsoftErrorComponent
    },
    {
        path: '**', component: SmartsoftErrorComponent
    }
];
// export const navbarRoute: Route = {
//     path: '',
//     component: NavbarComponent,
//     outlet: 'navbar'
//   };
