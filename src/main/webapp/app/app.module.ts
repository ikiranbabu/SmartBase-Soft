import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { SmartsoftSharedModule, UserRouteAccessService } from './shared';
import { SmartsoftHomeModule } from './home/home.module';
import { SmartsoftAdminModule } from './admin/admin.module';
import { SmartsoftAccountModule } from './account/account.module';
import { SmartsoftEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { AppState } from "./app.service";
import { AppConfig } from "./app.config";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { CoreModule } from "./shared/core.module";
import { SmartsoftAppComponent } from "./app.component";
import { SmartsoftErrorComponent } from "./error/error.component";
import { ErrorComponent } from "./layouts/error/error.component";
import { ProfileService } from "./layouts/profiles/profile.service";
import { ROUTES } from "./app.route";
import { LayoutModule } from "./layout/layout.module";

// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState,
    AppConfig,
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        RouterModule.forRoot(ROUTES, { useHash: true }),
        Ng2Webstorage.forRoot({ prefix: 'smartsoft', separator: '~'}),
        SmartsoftSharedModule,
        CoreModule,
    ],
    declarations: [
        SmartsoftAppComponent,
        SmartsoftErrorComponent,
        ErrorComponent
    ],
    providers: [
        APP_PROVIDERS,
        ProfileService,
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ SmartsoftAppComponent ]
})
export class SmartsoftAppModule {}
